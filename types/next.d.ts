import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
} from 'next';
import type { AppProps } from 'next/app';

declare module 'next' {
  type NextLayoutComponentType = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module 'next/app' {
  type AppLayoutProps = AppProps & {
    Component: NextLayoutComponentType;
  };
}