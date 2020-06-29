import React from 'react';
import ContentLoader from 'react-content-loader';

export default function LoadingTable() {
    return (
        <ContentLoader viewBox="0 0 380 140">
			<rect x="0" y="0" rx="4" ry="4" width="100%" height="20" />
			<rect x="0" y="30" rx="4" ry="4" width="100%" height="20" />
			<rect x="0" y="60" rx="4" ry="4" width="100%" height="20" />
			<rect x="0" y="90" rx="4" ry="4" width="100%" height="20" />
			<rect x="0" y="120" rx="4" ry="4" width="100%" height="20" />
		</ContentLoader>
    );
}
