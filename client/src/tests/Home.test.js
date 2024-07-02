import { render, fireEvent, screen } from "@testing-library/react";
import Home from "../Home";

test('add blogs', ()=>{
    render(<Home />)

    // const firstDeleteBlogButton = screen.getByTestId('delBtn0')
    const mainDiv = screen.getByTestId('mainDiv')

    // fireEvent.click(firstDeleteBlogButton)

    // expect(mainDiv).not.toHaveTextContent("Timber Wolves")
    expect(mainDiv).toHaveTextContent('David')
})