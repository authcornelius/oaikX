// Import all images here
import IntroImg from '../images/4045060.jpg';
import OnboardImg from '../images/11197287.png'
import OnboardImg2 from '../images/10811.jpg'
import OnboardImg3 from '../images/20945159.jpg'
// Import other images as needed


// Export them in an organized way
export const OnboardingImages = {
  intro: IntroImg,
  onboard1: OnboardImg,
  onboard2: OnboardImg2,
  onboard3: OnboardImg3
};

export const OnboardingImagesTitle = {
  title1: "Find Your Perfect Property",
  title2: "Easy Booking Process",
  title3: "Secure Transactions"
}

export const OnboardingImagesDescription = {
  description1: "Browse through thousands of properties that match your preferences.",
  description2: "Book viewings and make offers with just a few taps.",
  description3: "Enjoy peace of mind with our secure payment system."
}

export const PropertyImages = {
  // Add property images here when you have them
};

// You can create more categories as needed
export const ProfileImages = {
  // Add profile related images
};

// Export a default object with all images for convenience
const Images = {
  onboarding: OnboardingImages,
  title: OnboardingImagesTitle,
  description: OnboardingImagesDescription,
  properties: PropertyImages,
  profile: ProfileImages,
};

export default Images;
