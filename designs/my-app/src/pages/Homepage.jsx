import React from 'react';
import "./Homepage.css"
import "../components/FeatureItem.css"

import BannerHero from '../layout/BannerHero';
import FeatureItem from '../components/FeatureItem';
import logofeatureChat from "/img/icon-chat.png";
import logofeatureMoney from "/img/icon-money.png"
import logofeatureSecurity from "/img/icon-security.png"

const Homepage = () => {
    return (
        
        <main>
            <BannerHero />
            <section className="features">
                <h2 className="sr-only">Features</h2>
            
            <FeatureItem
            state={{
                title: "You are our #1 priority",
                description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
                logo: logofeatureChat,
          }}
        />
            <FeatureItem
            state={{
                title: "More savings means higher rates",
                description: "The more you save with us, the higher your interest rate will be!",
                logo: logofeatureMoney,
          }}
        />
            <FeatureItem
            state={{
                title: "Security you can trust",
                description: "We use top of the line encryption to make sure your data and money is always safe.",
                logo: logofeatureSecurity,
          }}
        />
            </section>
        </main>
    );
};

export default Homepage;