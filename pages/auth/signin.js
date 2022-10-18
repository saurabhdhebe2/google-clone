import Header from "../../components/Header";
import { getProviders, signIn } from "next-auth/react";

const signin = ({ providers }) => {
  return (
    <>
      <Header />
      <div>
        {Object.values(providers).map((provider) => (
          <div className="flex flex-col items-center m-40" key={provider.name}>
            <img
              className="w-52 object-cover "
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
              alt="google logo"
            ></img>
            <p className="text-sm italic my-10 text-center">
              This Website Is Created For Learning Purposes
            </p>
            <button
              className="bg-red-400 rounded-lg text-white p-3 hover:bg-red-500"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign In With {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
