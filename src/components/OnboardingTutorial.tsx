
import { useEffect } from "react";
import GuidedTutorial from "@/components/GuidedTutorial";

const OnboardingTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(true);
  
  useEffect(() => {
    // Only show tutorial if it hasn't been completed before
    const tutorialCompleted = localStorage.getItem('guidedTutorialCompleted') === 'true';
    if (tutorialCompleted) {
      setShowTutorial(false);
    }
  }, []);
  
  const handleComplete = () => {
    localStorage.setItem('guidedTutorialCompleted', 'true');
    setShowTutorial(false);
  };
  
  if (!showTutorial) {
    return null;
  }
  
  // Instead of showing our own tutorial, use the GuidedTutorial
  return <GuidedTutorial onComplete={handleComplete} />;
};

export default OnboardingTutorial;
