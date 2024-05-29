import { ScaffoldEthAppWithProviders } from "@/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import { getMetadata } from "@/utils/scaffold-eth/getMetadata";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata = getMetadata({
  title: "Soulinus",
  description:
    "Soulinus is a blockchain-based inheritance application enabling automatic transfer of digital assets to designated beneficiaries upon the user's death. Secure, seamless, and reliable, Soulinus ensures your legacy is preserved exactly as intended",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
