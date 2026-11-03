import React from 'react';
import Image from 'next/image';
import styles from './Experience.module.css';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={`container ${styles.grid}`}>
        {/* Left Mosaic Images */}
        <div className={styles.imageMosaic}>
          <div className={`${styles.mosaicCard} ${styles.mosaicCardLarge}`}>
            <Image
              src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80"
              alt="Luxury banquet setup with master chef plating"
              width={600}
              height={280}
              className={styles.mosaicImg}
              unoptimized
            />
          </div>
          <div className={`${styles.mosaicCard} ${styles.mosaicCardSmall}`}>
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=500&q=80"
              alt="Executive Chef preparing fresh dim sum"
              width={300}
              height={220}
              className={styles.mosaicImg}
              unoptimized
            />
          </div>
          <div className={`${styles.mosaicCard} ${styles.mosaicCardSmall}`}>
            <Image
              src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80"
              alt="Sommelier fine wine pairing"
              width={300}
              height={220}
              className={styles.mosaicImg}
              unoptimized
            />
          </div>
        </div>

        {/* Right Content */}
        <div className={styles.content}>
          <span className={styles.subHeading}>The Ahlan Hospitality Standard</span>
          <h2 className={styles.title}>Where Warm Hospitality Meets 5-Star Culinary Mastery</h2>
          <p className={styles.lead}>
            From our state-of-the-art central commissary kitchen to your corporate lunch tables
            and grand wedding venues, Ahlan Catering was founded on a simple promise: to treat
            every guest like family with punctual service, hygienic gourmet cooking, and heartfelt warmth.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🍱</div>
              <div>
                <h4 className={styles.featureTitle}>Punctual Office Lunch Subscriptions</h4>
                <p className={styles.featureDesc}>
                  Insulated thermal cambros guarantee steaming hot, chef-balanced lunches delivered
                  to your corporate headquarters on time every day without fail.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🥟</div>
              <div>
                <h4 className={styles.featureTitle}>Artisanal Dim Sum & Theatrical Live Stations</h4>
                <p className={styles.featureDesc}>
                  Hand-pleated dumplings, sizzling charcoal BBQ skewers, and live wok stir-fries
                  prepared fresh right in front of your event guests.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>📜</div>
              <div>
                <h4 className={styles.featureTitle}>100% Halal Certified & ISO Food Hygiene</h4>
                <p className={styles.featureDesc}>
                  Strict farm-to-fork traceability, certified HACCP/ISO food safety protocols,
                  and temperature-monitored logistics for total peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
