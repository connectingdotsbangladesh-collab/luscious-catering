import { QuoteRequest, QuoteResult } from '../domain/types';

export function calculateCateringQuote(request: QuoteRequest): QuoteResult {
  const { guestCount, packageTier, courses, hasLiveStation, liveStationCount, hasBarService, tablewareTier } = request;

  // Base tier pricing per person
  let perPersonBase = 45; // Essential
  if (packageTier === 'signature') perPersonBase = 75;
  if (packageTier === 'imperial-lux') perPersonBase = 120;

  // Add extra courses adjustment ($8 per extra course above 3)
  const additionalCourses = Math.max(0, courses - 3);
  perPersonBase += additionalCourses * 8;

  // Food base total
  const foodBaseTotal = Math.round(perPersonBase * guestCount);

  // Live stations ($350 setup & chef staffing per station)
  const liveStationFee = hasLiveStation ? liveStationCount * 350 : 0;

  // Bar Service ($14 per guest)
  const barServiceFee = hasBarService ? Math.round(guestCount * 14) : 0;

  // Tableware upgrades
  let tablewareRatePerGuest = 0;
  if (tablewareTier === 'fine-porcelain') tablewareRatePerGuest = 6;
  if (tablewareTier === 'royal-gold-rim') tablewareRatePerGuest = 12;
  const tablewareFee = Math.round(guestCount * tablewareRatePerGuest);

  // Luxury Service & logistics fee (12% of food base)
  const serviceCharge = Math.round(foodBaseTotal * 0.12);

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
        label: `${packageTier.toUpperCase()} Gourmet Menu (${courses} Courses)`,
        amount: foodBaseTotal,
        description: `Bespoke culinary prep for ${guestCount} guests at $${perPersonBase}/person`,
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
              label: 'Artisan Beverage & Mocktail/Cocktail Bar Service',
              amount: barServiceFee,
              description: `Dedicated mixologists and signature drink pairings for ${guestCount} guests`,
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
        label: 'Event Coordination, Logistics & On-site Captain',
        amount: serviceCharge,
        description: 'Complete white-glove setup, culinary execution, staff service & breakdown',
      },
    ],
  };
}
