import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponet, axios) => {
    return class extends Component {
        state={
            error: null
        }
        componentWillMount(){

            this.reqInterceptor= axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.respInterceptor= axios.interceptors.response.use(res=>res, err => {
                this.setState({error : err})

            });
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);

        }
        errorHandler = () => {
            this.setState({ error : null })
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorHandler}>
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponet {...this.props} />
                </Aux>
            );
        }
    }
}





export default withErrorHandler;