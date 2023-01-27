import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import WelcomeComponent from "../WelcomeComponent.vue";

describe("WelcomeComponent", () => {
  it("renders properly", () => {
    const wrapper = mount(WelcomeComponent, { propsData: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
