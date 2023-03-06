import React from 'react';
import { Grid, Box, Text, Input, Button } from "@chakra-ui/react";

function Copyright() {
    return (
        <Text variant="body2" color="textSecondary" align="center">
        {'Created by © Sander de Bruijn '}
        {new Date().getFullYear()}
        {'.'}
        </Text>
    );
}

export default Copyright;