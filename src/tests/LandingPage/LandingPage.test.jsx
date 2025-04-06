import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from '../../components/LandingPage/LandingPage'; // Adjust path as needed
import UserContext from '../../components/Context/User/UserContext';
import axios from 'axios';

// Mock Navbar component
jest.mock('../../components/Navbar/Navbar', () => () => <div>Mocked Navbar</div>);

// Mock useNavigate from react-router
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
    },
}));

const mockUserContext = {
    isUserLoggedIn: false,
};

const renderWithProviders = (ui, { contextValue = mockUserContext } = {}) => {
    return render(
        <UserContext.Provider value={contextValue}>
            {ui}
        </UserContext.Provider>
    );
};

describe('LandingPage', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        axios.get.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test 1: Renders basic elements
    it('Navbar és landingPage renderelése bannerrel', () => {
        renderWithProviders(<LandingPage />);
        expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
        expect(screen.getByText('Érd el céljaid profi segítséggel')).toBeInTheDocument();
    });

    // Test 2: Shows registration button when user is not logged in
    it('Regisztrációs gomb megjelenítése, ha a felhasználó nincs bejelentkezve', () => {
        renderWithProviders(<LandingPage />);
        const regButton = screen.getByText('Regisztráció');
        expect(regButton).toBeInTheDocument();
        regButton.click();
        expect(mockNavigate).toHaveBeenCalledWith('/registration');
    });

    // Test 3: Hides registration button when user is logged in
    it('Regisztrációs gomb elrejtése, ha a felhasználó be van jelentkezve', () => {
        renderWithProviders(<LandingPage />, {
            contextValue: { isUserLoggedIn: true },
        });
        expect(screen.queryByText('Regisztráció')).not.toBeInTheDocument();
    });

    // Test 4: Displays trainers when data is fetched successfully
    it('Edzők megjelenítése sikeres adatlekérdezés esetén', async () => {
        const mockTrainers = [
            { id: 1, name: 'Kovács Péter', phoneNumber: '36201234567', qualification: 'PERSONAL_TRAINER', rating: 4.5 },
            { id: 2, name: 'Nagy Anna', phoneNumber: '36309876543', qualification: 'PILATES_INSTRUCTOR', rating: 4.0 },
        ];
        const mockImageBuffer = new ArrayBuffer(8);
        const mockBlobUrl = 'blob:http://localhost/mock-url';

        // Mock axios responses
        axios.get
            .mockResolvedValueOnce({ data: mockTrainers }) // /trainer/bestRatedTrainers
            .mockResolvedValueOnce({ data: mockImageBuffer }) // /trainer/picture/1
            .mockResolvedValueOnce({ data: mockImageBuffer }); // /trainer/picture/2

        // Mock URL.createObjectURL
        global.URL.createObjectURL = jest.fn(() => mockBlobUrl);

        renderWithProviders(<LandingPage />);

        await waitFor(() => {
            expect(screen.getByText('Edzőink')).toBeInTheDocument();
            expect(screen.getByText('Kovács Péter')).toBeInTheDocument();
            expect(screen.getByText('+36 (20) 123-4567')).toBeInTheDocument();
            expect(screen.getByText('Personal Trainer')).toBeInTheDocument();
            expect(screen.getByText('4.5')).toBeInTheDocument();

            expect(screen.getByText('Nagy Anna')).toBeInTheDocument();
            expect(screen.getByText('+36 (30) 987-6543')).toBeInTheDocument();
            expect(screen.getByText('Pilates Instructor')).toBeInTheDocument();
            expect(screen.getByText('4.0')).toBeInTheDocument();
        });

        expect(axios.get).toHaveBeenCalledWith('/trainer/bestRatedTrainers');
        expect(axios.get).toHaveBeenCalledWith('/trainer/picture/1', { responseType: 'arraybuffer' });
        expect(axios.get).toHaveBeenCalledWith('/trainer/picture/2', { responseType: 'arraybuffer' });
    });

    // Test 5: Shows message when no trainers are available
    it('Üzenet megjelenítése, ha nincsenek edzők', async () => {
        axios.get.mockResolvedValueOnce({ data: [] }); // No trainers

        renderWithProviders(<LandingPage />);

        await waitFor(() => {
            expect(screen.getByText('Jelenleg egy edző sem dolgozik nálunk!')).toBeInTheDocument();
        });
    });

    // Test 6: Handles fetch errors gracefully
    it('Hiba kezelése az edzők lekérdezésekor', async () => {
        axios.get.mockRejectedValueOnce(new Error('Fetch error'));

        renderWithProviders(<LandingPage />);

        await waitFor(() => {
            expect(screen.getByText('Edzőink')).toBeInTheDocument();
            expect(screen.getByText('Jelenleg egy edző sem dolgozik nálunk!')).toBeInTheDocument();
        });
    });
});