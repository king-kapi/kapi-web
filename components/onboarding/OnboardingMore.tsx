import Select from "@/components/Select";

const OnboardingMore = () => {
  return (
    <div>
      <h1 className={"mt-[2.5rem]"}>Let&apos;s learn more about you.</h1>

      <h3 className={"mt-[2.625rem] mb-5"}>What languages do you speak?</h3>

      <Select initialIndex={0} options={[
        { text: "English", value: "en" },
        { text: "Spanish", value: "es" },
        { text: "Chinese", value: "cn" },
        { text: "Japanese", value: "jp" }
      ]}/>

      <h3 className={"mt-[2.625rem] mb-5"}>What is your time zone?</h3>

      <Select initialIndex={0} options={[
        { text: "English", value: "en" },
        { text: "Spanish", value: "es" },
        { text: "Chinese", value: "cn" },
        { text: "Japanese", value: "jp" }
      ]}/>
    </div>
  );
};

export default OnboardingMore;