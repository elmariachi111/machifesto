import { subtitle, title } from "@/components/primitives";
import Signers from "@/components/signers";
import TweetIntent from "@/components/tweet-intent";
import TwitterLogin from "@/components/twitter-login";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Sign the&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>machifesto&nbsp;</h1>
        <br />
        <h1 className={title()}>It is very good.</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Just here to test things.
        </h2>
      </div>

      <TwitterLogin />
      <TweetIntent />
      <Signers />
      {/* <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="flat">
          <span>
            built out of fun by <Code color="primary">elmariachi</Code>
          </span>
        </Snippet>
      </div> */}
    </section>
  );
}
