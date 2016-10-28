import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { red400, green500 } from 'material-ui/styles/colors';

import AddSedy from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import RemoveSedy from 'material-ui/svg-icons/action/delete';

const styles = {
    name: {
        fontSize: '1rem',
        marginBottom: '.5rem',
    },
    description: {
        marginTop: 0,
        color: '#888',
        fontStyle: 'italic',
    },
    actions: {
        textAlign: 'center',
        width: '2rem',
    },
    actionButton: {
        minWidth: 'inherit',
        width: '100%',
    },
};

class Repository extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasSedy: props.sedy_installed,
            loading: false,
        };
    }

    toggleSedy = () => {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({
                loading: false,
                hasSedy: !this.state.hasSedy,
            });
        }, 2000);
    };

    actions() {
        if (this.state.loading) {
            return <CircularProgress />;
        }

        return (
            <FlatButton
                onClick={this.toggleSedy}
                style={styles.actionButton}
                icon={
                    this.state.hasSedy ?
                    <RemoveSedy color={red400} /> :
                    <AddSedy color={green500} />
                }
            />
        );
    }

    render() {
        const {
            repository,
        } = this.props;

        return (
            <TableRow className="repository">
                <TableRowColumn>
                    <div>
                        <h5 style={styles.name}>{repository.full_name}</h5>
                        <p style={styles.description}>{repository.description}</p>
                    </div>
                </TableRowColumn>
                <TableRowColumn style={styles.actions}>
                    {this.actions()}
                </TableRowColumn>
            </TableRow>
        );
    }
};

Repository.propTypes = {
    repository: PropTypes.shape({
        description: PropTypes.string,
        full_name: PropTypes.string.isRequired,
        html_url: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        private: PropTypes.bool.isRequired,
        sedy_installed: PropTypes.bool.isRequired,
    }),
};

export default Repository;
