import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blogs from '../../components/Blogs/Blogs'; // Adjust path as needed
import UserContext from '../../components/Context/User/UserContext';
import BlogContext from '../../components/Context/Blog/BlogContext';
import axios from 'axios';

// Mock Navbar component
jest.mock('../../components/Navbar/Navbar', () => () => <div>Mocked Navbar</div>);

// Mock child components
jest.mock('../../components/Blogs/CreateBlog/CreateBlog', () => ({ close }) => (
    <div>CreateBlog <button onClick={close}>Close</button></div>
));
jest.mock('../../components/Blogs/EditBlog/EditBlog', () => ({ close, blog }) => (
    <div>EditBlog {blog?.title} <button onClick={close}>Close</button></div>
));
jest.mock('../../components/Confirmation', () => ({ close, deleteFunction, deletingId }) => (
    <div>Confirmation <button onClick={() => deleteFunction(deletingId)}>Confirm</button></div>
));

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    useNavigate: () => mockNavigate,
}));

// Mock axios
jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        delete: jest.fn().mockResolvedValue({}),
    },
}));

// Mock BlogContext
const mockBlogContext = {
    blogs: [],
    fetchBlogs: jest.fn().mockResolvedValue([]),
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
        axios.get.mockClear();
        axios.delete.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test 1: Renders basic elements with no blogs
    it('renders the blogs page with navbar and no blogs message', async () => {
        renderWithProviders(<Blogs />);
        await waitFor(() => {
            expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
            expect(screen.getByText('Jelenleg egy blog sem elérhető')).toBeInTheDocument();
        });
    });

    // Test 2: Renders blogs with images when they are available
    it('renders blogs with images when provided in context', async () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                blogType: 'TRAINING',
            },
        ];
        const mockImageBuffer = new ArrayBuffer(8);
        const mockBlobUrl = 'blob:http://localhost/mock-url';

        axios.get.mockResolvedValueOnce({ data: mockImageBuffer });
        global.URL.createObjectURL = jest.fn(() => mockBlobUrl);

        renderWithProviders(<Blogs />, {
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });

        await waitFor(() => {
            expect(screen.getByText('Test Blog')).toBeInTheDocument();
            expect(screen.getByText('Edzés')).toBeInTheDocument();
            expect(screen.getByAltText('Test Blog')).toHaveAttribute('src', mockBlobUrl);
        });

        expect(axios.get).toHaveBeenCalledWith('/blog/blog/picture/1', {
            responseType: 'arraybuffer',
            timeout: 3000,
        });
    });

    // Test 3: Shows create button for trainer user type
    it('shows create button when userType is TRAINER', () => {
        renderWithProviders(<Blogs />, {
            userContextValue: { userType: 'TRAINER' },
        });
        const createButton = screen.getByLabelText('add');
        expect(createButton).toBeInTheDocument();
        fireEvent.click(createButton);
        expect(screen.getByText(/CreateBlog/i)).toBeInTheDocument();
    });

    // Test 4: Hides create button for non-trainer user type
    it('hides create button when userType is null', () => {
        renderWithProviders(<Blogs />);
        expect(screen.queryByLabelText('add')).not.toBeInTheDocument();
    });

    // Test 5: Shows edit and delete icons for trainer user type
    it('shows edit and delete icons for trainer user type', async () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                blogType: 'TRAINING',
            },
        ];
        axios.get.mockResolvedValueOnce({ data: new ArrayBuffer(8) });
        global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-url');

        renderWithProviders(<Blogs />, {
            userContextValue: { userType: 'TRAINER' },
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });

        await waitFor(() => {
            expect(screen.getByLabelText('edit')).toBeInTheDocument();
            expect(screen.getByLabelText('delete')).toBeInTheDocument();
        });
    });

    // Test 6: Hides edit and delete icons for non-trainer user type
    it('hides edit and delete icons for non-trainer user type', async () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                blogType: 'TRAINING',
            },
        ];
        axios.get.mockResolvedValueOnce({ data: new ArrayBuffer(8) });
        global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-url');

        renderWithProviders(<Blogs />, {
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });

        await waitFor(() => {
            expect(screen.queryByLabelText('edit')).not.toBeInTheDocument();
            expect(screen.queryByLabelText('delete')).not.toBeInTheDocument();
        });
    });

    // Test 7: Navigates to blog details on card click
    it('navigates to blog details when blog card is clicked', async () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                blogType: 'TRAINING',
            },
        ];
        axios.get.mockResolvedValueOnce({ data: new ArrayBuffer(8) });
        global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-url');

        renderWithProviders(<Blogs />, {
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });

        await waitFor(() => {
            const blogTitle = screen.getByText('Test Blog');
            fireEvent.click(blogTitle);
            expect(mockNavigate).toHaveBeenCalledWith('/openedBlog', {
                state: expect.objectContaining({
                    blog: mockBlogs[0],
                    blogImages: expect.any(Object),
                }),
            });
        });
    });

    // Test 8: Opens edit modal when edit icon is clicked
    it('opens edit modal when edit icon is clicked', async () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                blogType: 'TRAINING',
            },
        ];
        axios.get.mockResolvedValueOnce({ data: new ArrayBuffer(8) });
        global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-url');

        renderWithProviders(<Blogs />, {
            userContextValue: { userType: 'TRAINER' },
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });

        await waitFor(() => {
            const editIcon = screen.getByLabelText('edit');
            fireEvent.click(editIcon);
            expect(screen.getByText('EditBlog Test Blog')).toBeInTheDocument();
        });
    });

    // Test 9: Opens delete confirmation modal when delete icon is clicked
    it('opens delete confirmation modal when delete icon is clicked', async () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                blogType: 'TRAINING',
            },
        ];
        axios.get.mockResolvedValueOnce({ data: new ArrayBuffer(8) });
        global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-url');

        renderWithProviders(<Blogs />, {
            userContextValue: { userType: 'TRAINER' },
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });

        await waitFor(() => {
            const deleteIcon = screen.getByLabelText('delete');
            fireEvent.click(deleteIcon);
            expect(screen.getByText(/Confirmation/i)).toBeInTheDocument();
        });
    });

    // Test 10: Handles image fetch error with fallback
    it('uses fallback image when blog image fetch fails', async () => {
        const mockBlogs = [
            {
                id: 1,
                title: 'Test Blog',
                blogType: 'TRAINING',
            },
        ];
        axios.get.mockRejectedValueOnce(new Error('Image fetch failed'));

        renderWithProviders(<Blogs />, {
            blogContextValue: { ...mockBlogContext, blogs: mockBlogs },
        });

        await waitFor(() => {
            const blogImage = screen.getByAltText('Test Blog');
            expect(blogImage).toHaveAttribute('src', 'https://via.placeholder.com/400x250?text=Nincs+kép');
        });
    });

    // Test 11: Shows error snackbar on fetchBlogs failure
    it('shows error snackbar when fetchBlogs fails', async () => {
        mockBlogContext.fetchBlogs.mockRejectedValueOnce(new Error('Fetch failed'));

        renderWithProviders(<Blogs />);

        await waitFor(() => {
            expect(screen.getByText('Sikertelen művelet!')).toBeInTheDocument();
        });
    });
});