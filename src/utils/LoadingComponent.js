/**
 * A functional component that renders a loading spinner using the RiseLoader component from the react-spinners library.
 * It applies custom CSS styles to the spinner.
 *
 * @example
 * import React from 'react';
 * import { css } from '@emotion/react';
 * import RiseLoader from 'react-spinners/CircleLoader';
 *
 * // CSS
 * const override = css`
 *   display: block;
 *   margin: 0 auto;
 *   border-color: red;
 * `;
 * const LoadingComponent = () => {
 *   return <RiseLoader color='red' loading={true} css={override} />;
 * };
 *
 * export default LoadingComponent;
 */
import React from 'react';
import { css } from '@emotion/react';
import RiseLoader from 'react-spinners/CircleLoader';

// CSS
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const LoadingComponent = () => {
  return <RiseLoader color='red' loading={true} css={override} />;
};

export default LoadingComponent;
