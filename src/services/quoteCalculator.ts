import { QuoteRequest, QuoteResult } from '../domain/types';

export function calculateCateringQuote(request: QuoteRequest): QuoteResult {
  const { guestCount, eventType, packageTier, courses, hasLiveStation, liveStationCount, hasBarService, tablewareTier } = request;

  const isCorporateLunch = eventType === 'corporate-lunch';

  // Base tier pricing per person
  let perPersonBase = 45; // Essential Event
  if (isCorporateLunch) {
    perPersonBase = 14; // Executive Daily Lunch Box base
    if (packageTier === 'signature') perPersonBase = 18;
    if (packageTier === 'imperial-lux') perPersonBase = 24;
  } else {
    if (packageTier === 'signature') perPersonBase = 75;
    if (packageTier === 'imperial-lux') perPersonBase = 120;

    // Add extra courses adjustment ($8 per extra course above 3 for events)
    const additionalCourses = Math.max(0, courses - 3);
    perPersonBase += additionalCourses * 8;
  }

  // Food base total
  const foodBaseTotal = Math.round(perPersonBase * guestCount);

  // Live stations ($350 setup & chef staffing per station)
  const liveStationFee = hasLiveStation ? liveStationCount * 350 : 0;

  // Bar Service ($14 per guest for events, $4 for fresh pressed juice bar in lunch)
  const barRate = isCorporateLunch ? 4 : 14;
  const barServiceFee = hasBarService ? Math.round(guestCount * barRate) : 0;

  // Tableware upgrades (minimal for corporate lunch, full porcelain/gold for events)
  let tablewareRatePerGuest = 0;
  if (!isCorporateLunch) {
    if (tablewareTier === 'fine-porcelain') tablewareRatePerGuest = 6;
    if (tablewareTier === 'royal-gold-rim') tablewareRatePerGuest = 12;
  }
  const tablewareFee = Math.round(guestCount * tablewareRatePerGuest);

  // Luxury Service & logistics fee (8% for corporate lunch drops, 12% for full banquets)
  const serviceRate = isCorporateLunch ? 0.08 : 0.12;
  const serviceCharge = Math.round(foodBaseTotal * serviceRate);

  const estimatedTotal = foodBaseTotal + liveStationFee + barServiceFee + tablewareFee + serviceCharge;

  return {
    guestCount,
    perPersonRate: Math.round(estimatedTotal / (guestCount || 1)),
    foodBaseTotal,
    liveStationFee,
    barServiceFee,
    tablewareFee,
    serviceCharge,
    estimatedTotal,
    breakdown: [
      {
        label: isCorporateLunch 
          ? `Ahlan Corporate Lunch Plan (${packageTier.toUpperCase()})` 
          : `${packageTier.toUpperCase()} Event Banquet (${courses} Courses)`,
        amount: foodBaseTotal,
        description: isCorporateLunch
          ? `Chef-crafted hot lunch boxes for ${guestCount} staff members at $${perPersonBase}/meal`
          : `Bespoke culinary prep for ${guestCount} guests at $${perPersonBase}/person`,
      },
      ...(liveStationFee > 0
        ? [
            {
              label: `Interactive Live Chef Station (${liveStationCount}x)`,
              amount: liveStationFee,
              description: 'Live dim sum steaming, artisanal carving station & dedicated master chefs',
            },
          ]
        : []),
      ...(barServiceFee > 0
        ? [
            {
              label: isCorporateLunch ? 'Fresh Botanical Juice & Mocktail Station' : 'Artisan Beverage & Drink Service',
              amount: barServiceFee,
              description: `${isCorporateLunch ? 'Cold-pressed natural juices' : 'Dedicated drink service'} for ${guestCount} people`,
            },
          ]
        : []),
      ...(tablewareFee > 0
        ? [
            {
              label: `Curated Tableware: ${tablewareTier.replace('-', ' ').toUpperCase()}`,
              amount: tablewareFee,
              description: 'Luxury charger plates, fine glassware, linen napkins & gold flatware',
            },
          ]
        : []),
      {
        label: isCorporateLunch ? 'Insulated Thermal Delivery & Logistics' : 'Event Coordination, Logistics & On-site Captain',
        amount: serviceCharge,
        description: isCorporateLunch 
          ? 'Guaranteed on-time office drop-off in heated thermal cambros' 
          : 'Complete white-glove setup, culinary execution, staff service & breakdown',
      },
    ],
  };
}
