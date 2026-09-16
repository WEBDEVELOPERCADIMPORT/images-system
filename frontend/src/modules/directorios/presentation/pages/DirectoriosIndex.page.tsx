import React from 'react';
import { useSearchParams } from 'react-router-dom';
import DirectoriosBrandsPage from './DirectoriosBrands.page';
import FoldersBrowserPage from './FoldersBrowser.page';

export const DirectoriosIndexPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const brandId = searchParams.get('brandId');

    if (brandId) {
        return <FoldersBrowserPage />;
    }

    return <DirectoriosBrandsPage />;
};

export default DirectoriosIndexPage;
