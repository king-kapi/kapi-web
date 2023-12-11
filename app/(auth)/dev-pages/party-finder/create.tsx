import LoginStatus from "@/src/components/LoginStatus";
import { GameList } from "@/src/types/Games";
import protectedGetServerSideProps from "@/src/utils/protectRoute";
import { FormEvent } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = protectedGetServerSideProps;

const CreateParty = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      game: formData.get("game") as string,
      maxSize: Number(formData.get("maxSize"))
    };

    const lobby = await fetch("/api/lobby", {
      method: "POST",
      body: JSON.stringify(body)
    });

    router.push("/party-finder/test");
  };

  return (
    <>
      <LoginStatus />
      <h1>Create a party</h1>
      <form onSubmit={handleSubmit}>
        <label>Game</label><br />
        <select name="game">
          {GameList.map(game => <option key={game} value={game}>{game}</option>)}
        </select>
        <br />
        <label>Max Size</label><br />
        <input name="maxSize" type="number" />
        <button>
          Create
        </button>
      </form>
    </>
  );
};

export default CreateParty;