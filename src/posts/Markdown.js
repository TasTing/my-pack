import React from 'react';
import ReactMarkdown from "react-markdown";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Image from "cloudinary-react/lib/components/Image";

const styles = (theme) => ({
    listItem: {
        marginTop: theme.spacing(1),
    },
});

const options = {
    overrides: {
        h1: {
            component: Typography,
            props: {
                gutterBottom: true,
                variant: 'h5',
            },
        },
        h2: {component: Typography, props: {gutterBottom: true, variant: 'h6'}},
        h3: {component: Typography, props: {gutterBottom: true, variant: 'subtitle1'}},
        h4: {
            component: Typography, props: {gutterBottom: true, variant: 'caption', paragraph: true},
        },
        p: {component: Typography, props: {paragraph: true}},
        a: {component: Link},
        li: {
            component: withStyles(styles)(({classes, ...props}) => (
                <li className={classes.listItem}>
                    <Typography component="span" {...props} />
                </li>
            )),
        },
        image: {component: Image, props:{dpr:"auto", responsive:true, width:"auto", crop:"scale", responsiveUseBreakpoints:"true"}},
    },
};

export default function Markdown(props) {
    return <ReactMarkdown options={options} {...props} />;
}