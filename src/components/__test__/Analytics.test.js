import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Dashboard from "../Dashboard";

const MockAnalytics = () => {
  return (
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  )
}

it('should be click on button and open analytics list', function () {
  render(<MockAnalytics />);
  const listItemElement = screen.getByTestId('alt-analytics')
  fireEvent.click(listItemElement)
  const chartImg = screen.getByTestId('nav-id')
  expect(chartImg).toHaveClass('closeNav')
});
