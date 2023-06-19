import styles from "../../styles/onboarding/OnboardingWelcome.module.css";
import Image from "next/image";
import kingKapiSVG from "@/assets/images/king_kapi.svg";

const OnboardingWelcome = () => (
  <div className={styles.OnboardingWelcomeContainer}>
    <div className={styles.AvatarContainer}>
      <Image className={styles.Avatar} src={kingKapiSVG} alt={"King Kapi"} />
      <h3>King Kapi</h3>
      <h4>Lv. 100</h4>
    </div>
    <div className={styles.MessageContainer}>
      <h1>Welcome Junior Capybara.</h1>
      <h2>You will embark on a journey to meet other capybaras from different communities.</h2>
    </div>
  </div>
);

export default OnboardingWelcome;