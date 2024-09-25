import "@testing-library/jest-dom";
// jest.setup.js or setupTests.js

global.IntersectionObserver = class {
  constructor() {}
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
};
