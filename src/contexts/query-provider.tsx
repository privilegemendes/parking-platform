import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// TODO: fix (react-refresh/ only-export-components) warning
export const queryClient = new QueryClient();

export const QueryProvider: FC<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
