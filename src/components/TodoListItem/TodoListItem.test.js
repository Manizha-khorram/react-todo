import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoListItem from './TodoListItem'

describe('TodoListItem', () => {
    const mockTodo = {
        id: 1,
        title: 'Test Todo',
        isFavorite: false,
    }

    const mockOnRemoveTodo = jest.fn()
    const mockOnToggleFavorite = jest.fn()

    beforeEach(() => {
        render(
            <TodoListItem
                todo={mockTodo}
                onRemoveTodo={mockOnRemoveTodo}
                onToggleFavorite={mockOnToggleFavorite}
            />
        )
    })

    test('renders todo title', () => {
        const todoTitleElement = screen.getByText('Test Todo')
        expect(todoTitleElement).toBeInTheDocument()
    })

    test('calls onRemoveTodo when "Completed" button is clicked', () => {
        const removeButton = screen.getByText('Completed')
        fireEvent.click(removeButton)
        expect(mockOnRemoveTodo).toHaveBeenCalledWith(1)
    })

    test('calls onToggleFavorite when star icon is clicked', () => {
        const starIcon = screen.getByTestId('star-icon')
        fireEvent.click(starIcon)
        expect(mockOnToggleFavorite).toHaveBeenCalledWith(1)
    })

    test('renders a filled star icon when todo is favorite', () => {
        const starIcon = screen.getByTestId('star-icon')
        expect(starIcon.querySelector('.filled-star')).toBeInTheDocument()
    })
})
