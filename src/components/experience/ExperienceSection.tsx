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
          <span className={styles.subHeading}>The Luscious Philosophy</span>
          <h2 className={styles.title}>Where Culinary Artistry Meets Impeccable Hospitality</h2>
          <p className={styles.lead}>
            Founded by veteran banquet directors and dim sum artisans, Luscious reimagines event
            catering as an interactive sensory journey. We believe the table is where human
            connections flourish.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🥟</div>
              <div>
                <h4 className={styles.featureTitle}>Master Dumpling & Dim Sum Atelier</h4>
                <p className={styles.featureDesc}>
                  Every dumpling wrapper is kneaded and pleated fresh within hours of your event,
                  delivering unrivaled texture and delicate burst of savory broth.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🌿</div>
              <div>
                <h4 className={styles.featureTitle}>100% Farm-To-Table & Regenerative Produce</h4>
                <p className={styles.featureDesc}>
                  We partner directly with organic family farms for crisp microgreens, heirloom
                  tomatoes, and pasture-raised meats.
                </p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>✨</div>
              <div>
                <h4 className={styles.featureTitle}>White-Glove Butler & Sommelier Service</h4>
                <p className={styles.featureDesc}>
                  From uniform precision to synchronized course reveals, our banquet captains
                  execute flawlessly behind the scenes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
