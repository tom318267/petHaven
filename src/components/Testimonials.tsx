import React from "react";
import TestimonialCard from "./TestimonialCard";

// Testimonial data structure
interface Testimonial {
  name: string;
  location: string;
  image: string;
  text: string;
  title: string;
}

// Main testimonial section component
const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah B.",
      location: "Chicago, IL",
      image: "https://randomuser.me/api/portraits/women/75.jpg", // Placeholder image
      text: "PetHaven has been my go-to for all my pet needs! Their range of products is fantastic, and the customer service is always prompt and helpful. My dog, Max, loves the toys I get from here, and I love the peace of mind knowing that I’m giving him safe, quality products. The delivery is quick, and the website is super easy to navigate. Highly recommend PetHaven to all pet owners!",
      title: "Amazing customer service and high-quality products!",
    },
    {
      name: "Michael T.",
      location: "Miami, FL",
      image: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder image
      text: "I recently bought travel accessories for my dog from PetHaven, and it made our trip a breeze! The portable water bottle and collapsible food bowls were lifesavers. It's clear that PetHaven cares about making pet care convenient and enjoyable. The prices are great, and their shipping is always on time. I’ll definitely be returning for more!",
      title: "",
    },
    {
      name: "Sophia L.",
      location: "Miami, FL",
      image: "https://randomuser.me/api/portraits/women/30.jpg", // Placeholder image
      text: "My cat has always been picky with her food, but the grain-free options from PetHaven have been a game-changer! She’s more energetic, her coat looks shiny, and I love knowing that she’s eating something that’s good for her health. PetHaven’s selection of premium cat food is top-notch. I’ll be a customer for life!",
      title: "Best quality pet food—my cat has never been healthier!",
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-[#2463EB] text-center mb-8">
          We love hearing from our customers
        </h2>
        <p className="text-lg text-[#1A1A1A] text-center mb-12 max-w-5xl mx-auto">
          See what our customers are saying about their interactions with us to
          get a better understanding of our dedication to showing you only
          genuine, truthful, and comprehensive evaluations.
        </p>

        {/* Testimonial cards */}
        <div>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
