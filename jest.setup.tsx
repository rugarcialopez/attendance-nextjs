import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock";
import { cache } from "swr";

fetchMock.enableMocks();

afterEach(() => {
  cache.clear();
});