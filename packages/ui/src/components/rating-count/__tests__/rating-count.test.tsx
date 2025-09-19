import { RatingCount } from '../rating-count'
import { render, getByTestId } from '@testing-library/react'

describe('RatingCount Component', () => {
    it('Renders minimal rating', () => {
        const element = render(<RatingCount average={4} display='minimal' />)
        expect(getByTestId(element.container, 'rating-count-minimal')).toBeInTheDocument()
    })

    it('Renders detailed rating', () => {
        const element = render(<RatingCount average={4} ratingCount={100} display="detailed" />)
        expect(getByTestId(element.container, 'rating-count-detailed')).toBeInTheDocument()
    })

    it('Renders default rating', () => {
        const element = render(<RatingCount average={4} ratingCount={100} />)
        expect(getByTestId(element.container, 'rating-count-default')).toBeInTheDocument()
    })
})
