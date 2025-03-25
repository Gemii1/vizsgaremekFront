import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from '../../components/LandingPage/LandingPage';
import UserContext from '../../components/Context/User/UserContext';

jest.mock('../../components/Navbar/Navbar', () => () => <div>Mocked Navbar</div>);

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    useNavigate: () => mockNavigate, // Mock useNavigate
}));

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn(() => Promise.resolve({ data: [] })),
    },
}));

const mockUserContext = {
    isUserLoggedIn: false,
};

const renderWithProviders = (ui, { contextValue = mockUserContext } = {}) => {
    return render(
        <UserContext.Provider value={contextValue}>
            {ui} {/* No BrowserRouter import needed */}
        </UserContext.Provider>
    );
};

describe('LandingPage', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        jest.mocked(require('axios').default.get).mockClear(); // Clear axios mock
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test 1: Renders basic elements
    it('Navbar és landingPage renderelése bannerrel', () => {
        renderWithProviders(<LandingPage />);
        expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
        expect(screen.getByText('Eddz velünk!')).toBeInTheDocument();
        expect(screen.getByText(/Hugo Girard/)).toBeInTheDocument();
    });

    it('Regisztrációs gomb megjelnítése, ha a felhasználó nincs bejelentkezve', () => {
        renderWithProviders(<LandingPage />);
        const regButton = screen.getByText('Regisztrálás');
        expect(regButton).toBeInTheDocument();
        regButton.click();
        expect(mockNavigate).toHaveBeenCalledWith('/registration');
    });

    // Test 3: Hides registration button when user is logged in
    it('Regisztrációs gomb elrejtése, ha a felhasználó be van jelentkezve', () => {
        renderWithProviders(<LandingPage />, {
            contextValue: { isUserLoggedIn: true },
        });
        expect(screen.queryByText('Regisztrálás')).not.toBeInTheDocument();
    });



});