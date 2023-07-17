import { signIn } from "next-auth/react";
import styles from "../styles/SignInPage.module.css";
import EmptyLayout from "@/components/layouts/EmptyLayout";
import Button from "@/components/Button";
import Icon from "@/components/icons/Icon";
import Link from "next/link";
import Image from "next/image";
import rainbowKapi from "@/assets/images/rainbow_kapi.png";
import Input from "@/components/Input";

export default function SignInPage() {
  function emailSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if ((formData.get("email") || "").length === 0)
      return alert('Please enter an email!');
    signIn("credentials", {
      callbackUrl: "/",
      email: formData.get("email")
    })
  }

  return (
    <div className={styles.SignInPage}>
      <div className={styles.Logo}>
        <Image src={rainbowKapi} alt={"Kapi"} />
      </div>
      <div className={[styles.SignInContainer, "bg-black"].join(" ")}>
        <div className={styles.SignInHeader}>
          <h1>Welcome</h1>
          <h3>Discover safe and inclusive gaming communities for you</h3>
        </div>
        <div className={styles.SignInButtons}>
          <Button className={styles.Button} buttonType="secondary" onClick={async () => {
            console.log(signIn("google", { callbackUrl: "/" }));
          }}>
            <Icon icon={"google_icon"} />
            Sign in with Google
          </Button>
          <Button className={styles.Button} onClick={() => signIn("discord", { callbackUrl: "/" })}>
            <Icon icon={"discord_icon"} />
            Sign in with Discord
          </Button>
          {process.env.NODE_ENV === "development" ?
            <form className={"flex mt-8 gap-x-4"} onSubmit={emailSignin}>
              <Input className={"flex-grow"} name={"email"} />
              <Button type={"submit"}>Email</Button>
            </form> : <></>
          }
        </div>
      </div>
    </div>
  );
}

SignInPage.getLayout = EmptyLayout.getLayout;