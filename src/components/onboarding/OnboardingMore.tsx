import KapiListbox from "@/src/components/KapiListbox";
import { useAtom } from "jotai/index";
import onboardingUserDataAtom from "@/src/atoms/onboardingUserDataAtom";

const OnboardingMore = () => {
  const [userData, setUserData] = useAtom(onboardingUserDataAtom);

  return (
    <div>
      <h1 className={"mt-[2.5rem]"}>Let&apos;s learn more about you.</h1>

      <h3 className={"mt-[2.625rem] mb-5"}>What language do you speak?</h3>

      <KapiListbox
        placeholder={"Select a language"}
        options={[
          { text: "English", value: "en" },
          { text: "Spanish", value: "es" },
          { text: "Chinese", value: "cn" },
          { text: "Japanese", value: "jp" }
        ]}
        onChange={selected => setUserData({
          ...userData,
          language: selected || undefined
        })} />

      <h3 className={"mt-[2.625rem] mb-5"}>What is your time zone?</h3>

      <KapiListbox
        placeholder={"Select a timezone"}
        options={[
          { text: "PST", value: "PST" },
          { text: "CST", value: "CST" },
          { text: "EST", value: "EST" }
        ]}
        onChange={selected => setUserData({
          ...userData,
          timezone: selected || undefined
        })} />
    </div>
  );
};

export default OnboardingMore;