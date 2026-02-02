import { type ReactNode, StrictMode } from 'react';

import { Provider } from 'react-redux';
import { RouterProvider, type RouterProviderProps } from 'react-router';

import { store } from '@/store';
import { render as reactTestingRender } from '@testing-library/react';
type RenderOptions =
    | {
          router: RouterProviderProps['router'];
          children?: never;
      }
    | {
          children: ReactNode;
          router?: never;
      };

export const render = ({ router, children }: RenderOptions) =>
    reactTestingRender(
        <StrictMode>
            (
            <Provider store={store}>
                {router && <RouterProvider router={router} />}){children}
            </Provider>
            ,
        </StrictMode>,
    );
