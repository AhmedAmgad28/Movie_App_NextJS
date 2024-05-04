import React from 'react';

const ErrorPage = () => {
    return (
        <div>
            ErrorPage
        </div>
    );
}

export default ErrorPage;

ErrorPage.getLayout = function pageLayout(page){
    return <>{page}</>;
}