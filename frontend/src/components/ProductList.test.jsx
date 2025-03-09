import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductList from "./ProductList";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("ProductList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      product: {
        products: { data: [{ planCode: "T11A20", packageName: "Plan A" }] },
        loading: false,
        error: null,
      },
    });
    store.dispatch = jest.fn();
  });

  it("✅ ควรเรียก fetchProducts เมื่อโหลด Component", () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("✅ ควรแสดงผลลัพธ์เมื่อกดปุ่มคำนวณจาก API จริง", async () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    fireEvent.click(screen.getByText("ผู้หญิง"));

    await waitFor(() => {
      expect(screen.getAllByRole("combobox").length).toBe(2); 
    });

    const [planSelect, paymentSelect] = screen.getAllByRole("combobox");

    fireEvent.mouseDown(planSelect); 
    await waitFor(() => screen.getByRole("listbox")); 
    fireEvent.click(screen.getByText((content) => content.includes("T11A20"))); 

    fireEvent.change(screen.getByLabelText("วันเกิด"), {
      target: { value: "1983-02-21" },
    });

    fireEvent.change(screen.getByLabelText("เบี้ยประกัน"), {
      target: { value: "30000" },
    });

    fireEvent.mouseDown(paymentSelect); 
    await waitFor(() => screen.getByRole("listbox")); 
    fireEvent.click(screen.getByText((content) => content.includes("รายปี"))); 

    const calculateButton = screen.getByRole("button", {
      name: "คำนวณเบี้ยประกัน",
    });
    fireEvent.click(calculateButton);

    await new Promise((resolve) => setTimeout(resolve, 3000)); 

    expect(await screen.findByText("แผนของคุณ:")).toBeInTheDocument();
    expect(await screen.findByText("T11A20")).toBeInTheDocument();
  });
});
