import { render, screen } from '@testing-library/react'
import Home from 'src/pages'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    screen.getByText('hello world')
  })
})
