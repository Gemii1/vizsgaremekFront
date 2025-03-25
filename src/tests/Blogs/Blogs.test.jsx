import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blogs from '../../components/Blogs/Blogs'; // Adjust path as needed
import UserContext from '../../components/Context/User/UserContext';
import BlogContext from '../../components/Context/Blog/BlogContext';

// Mock Navbar component
jest.mock('../../components/Navbar/Navbar', () => () => <div>Mocked Navbar</div>);

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    useNavigate: () => mockNavigate,
}));

// Mock axios to prevent real API calls
jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn().mockResolvedValue({ data: [] }),
        delete: jest.fn().mockResolvedValue({}),
    },
}));

// Mock BlogContext
const mockBlogContext = {
    blogs: [],
    fetchBlogs: jest.fn(),
};

// Mock UserContext
const mockUserContext = {
    userType: null, // Default to non-trainer
};

// Helper to wrap the component with necessary providers
const renderWithProviders = (
    ui,
    {
        userContextValue = mockUserContext,
        blogContextValue = mockBlogContext,
    } = {}
) => {
    return render(
        <UserContext.Provider value={userContextValue}>
            <BlogContext.Provider value={blogContextValue}>
                {ui}
            </BlogContext.Provider>
        </UserContext.Provider>
    );
};

describe('Blogs', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockBlogContext.fetchBlogs.mockClear();
        jest.mocked(require('axios').default.get).mockClear();
        jest.mocked(require('axios').default.delete).mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test 1: Renders basic elements with no blogs
    it('renders the blogs page with navbar and no blogs message', () => {
        renderWithProviders(<Blogs />);
        expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
        expect(screen.getByText('Jelenleg egy blog sem elérhető')).toBeInTheDocument();
    });

    // Test 2: Renders blogs when they are available
    it('renders blogs when provided in context', () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                image: 'http://example.com/image.jpg',
                blogType: 'TRAINING',
            },
        ];
        renderWithProviders(<Blogs />, {
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });
        expect(screen.getByText('Test Blog')).toBeInTheDocument();
        expect(screen.getByText('Edzés')).toBeInTheDocument(); // blogType = TRAINING
    });

    // Test 3: Shows create button for trainer user type
    it('shows create button when userType is trainer', () => {
        renderWithProviders(<Blogs />, {
            userContextValue: { userType: true },
        });
        const createButton = screen.getByLabelText('add');
        expect(createButton).toBeInTheDocument();
        fireEvent.click(createButton);
        expect(screen.getByText(/CreateBlog/i)).toBeInTheDocument(); // Assuming CreateBlog renders something identifiable
    });

    // Test 4: Hides create button for non-trainer user type
    it('hides create button when userType is null', () => {
        renderWithProviders(<Blogs />);
        expect(screen.queryByLabelText('add')).not.toBeInTheDocument();
    });

    // Test 5: Shows edit and delete icons for trainer user type
    it('shows edit and delete icons for trainer user type', () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                image: 'http://example.com/image.jpg',
                blogType: 'TRAINING',
            },
        ];
        renderWithProviders(<Blogs />, {
            userContextValue: { userType: 'TRAINER' },
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });
        expect(screen.getByLabelText('edit')).toBeInTheDocument();
        expect(screen.getByLabelText('delete')).toBeInTheDocument();
    });

    // Test 6: Hides edit and delete icons for non-trainer user type
    it('hides edit and delete icons for non-trainer user type', () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                image: 'http://example.com/image.jpg',
                blogType: 'TRAINING',
            },
        ];
        renderWithProviders(<Blogs />, {
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });
        expect(screen.queryByLabelText('edit')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('delete')).not.toBeInTheDocument();
    });

    // Test 7: Navigates to blog details on click
    it('navigates to blog details when blog card is clicked', () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                image: 'http://example.com/image.jpg',
                blogType: 'TRAINING',
            },
        ];
        renderWithProviders(<Blogs />, {
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });
        const blogCard = screen.getByText('Test Blog');
        fireEvent.click(blogCard);
        expect(mockNavigate).toHaveBeenCalledWith('/openedBlog', { state: mockBlogs[0] });
    });

    // Test 8: Opens edit modal when edit icon is clicked
    it('opens edit modal when edit icon is clicked', () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                image: 'http://example.com/image.jpg',
                blogType: 'TRAINING',
            },
        ];
        renderWithProviders(<Blogs />, {
            userContextValue: { userType: 'TRAINER' },
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });
        const editIcon = screen.getByLabelText('edit');
        fireEvent.click(editIcon);
        expect(screen.getByText(/EditBlog/i)).toBeInTheDocument(); // Assuming EditBlog renders something identifiable
    });

    // Test 9: Opens delete confirmation modal when delete icon is clicked
    it('opens delete confirmation modal when delete icon is clicked', () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                image: 'http://example.com/image.jpg',
                blogType: 'TRAINING',
            },
        ];
        renderWithProviders(<Blogs />, {
            userContextValue: { userType: 'TRAINER' },
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });
        const deleteIcon = screen.getByLabelText('delete');
        fireEvent.click(deleteIcon);
        expect(screen.getByText(/Confirmation/i)).toBeInTheDocument(); // Assuming Confirmation renders something identifiable
    });
});