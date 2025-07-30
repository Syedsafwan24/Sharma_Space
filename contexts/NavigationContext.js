'use client';
import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<NavigationContext.Provider
			value={{
				isMobileMenuOpen,
				setIsMobileMenuOpen,
			}}
		>
			{children}
		</NavigationContext.Provider>
	);
};

export const useNavigation = () => {
	const context = useContext(NavigationContext);
	if (context === undefined) {
		throw new Error('useNavigation must be used within a NavigationProvider');
	}
	return context;
};
