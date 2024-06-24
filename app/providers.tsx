"use client";

import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import * as React from "react";
import { WagmiProvider, createConfig } from "wagmi";

import { chainConfig } from "@/config/chain";
import { siteConfig } from "@/config/site";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const wagmiConfig = createConfig(
  getDefaultConfig({
    ...chainConfig,
    ssr: true,
    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: siteConfig.name,

    // Optional App Info
    appDescription: siteConfig.description,
    appUrl: "https://machifesto.vercel.app",
    appIcon: "https://machifesto.vercel.app/icon.png",
  }),
);

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  const queryClient = new QueryClient();

  //https://medium.com/@rezahedi/using-nextauth-authentication-provider-in-next-js-by-app-router-f50cb23282c9
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <ConnectKitProvider>{children}</ConnectKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
