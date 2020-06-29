import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from '../components/contents/components.contents.home';
import MysqlUser from '../components/contents/components.contents.mysqluser';
import PostgresqlUser from '../components/contents/components.contents.postgresqluser';
import _404 from '../components/contents/components.contents._404';

import Container from 'react-bootstrap/Container';

const ContentPages = [
    { path: '/', component: Home },
    { path: '/mysql', component: MysqlUser },
    { path: '/postgresql', component: PostgresqlUser },
]

export default function ComponentContent() {
    return (
        <Container fluid className="pt-3">
            <Switch>
                {
                    ContentPages.map((item, index) => (
                        <Route key={index} exact path={item.path} component={item.component} />
                    ))
                }
                <Route path="" component={_404} />
            </Switch>
        </Container>
    );
}
