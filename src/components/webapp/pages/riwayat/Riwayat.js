import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { 
    Container, 
    Row, 
    Col, 
    Card} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp} from '@fortawesome/free-solid-svg-icons'
import Panel from '../../layout/Panel'
import './Riwayat.css'

export class Riwayat extends Component {
    
  render() {
    const { SearchBar } = Search;
    const products = [
        {
            id: 1,
            date: '12-11-2019',
            packet_name: 'Paket 1',
            tpa_score: '900',
            saintek_score: '635'
        },
        {
            id: 2,
            date: '12-11-2019',
            packet_name: 'Paket 1',
            tpa_score: '900',
            saintek_score: '635'
        },
        {
            id: 3,
            date: '12-11-2019',
            packet_name: 'Paket 1',
            tpa_score: '900',
            saintek_score: '635'
        },
        
    ]
    
    const columns = [
        {
            dataField: 'id',
            text: 'Num#',
            align: 'center',
            sort: true,
            // hidden: true,
            sortCaret: (order, column) => {
                if (!order) return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} />
                    <FontAwesomeIcon icon={faCaretUp} />
                </span>);
                else if (order === 'asc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretUp} color="#334634" />
                </span>);
                else if (order === 'desc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} color="#334634" />
                </span>);
                return null;
            }
        }, 
        {
            dataField: 'date',
            text: 'Tanggal',
            align: 'center',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} />
                    <FontAwesomeIcon icon={faCaretUp} />
                </span>);
                else if (order === 'asc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretUp} color="#334634" />
                </span>);
                else if (order === 'desc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} color="#334634" />
                </span>);
                return null;
            }
        }, 
        {
            dataField: 'packet_name',
            text: 'Nama Paket',
            align: 'center',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} />
                    <FontAwesomeIcon icon={faCaretUp} />
                </span>);
                else if (order === 'asc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretUp} color="#334634" />
                </span>);
                else if (order === 'desc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} color="#334634" />
                </span>);
                return null;
            }
        },
        {
            dataField: 'tpa_score',
            text: 'Skor TPA',
            align: 'center',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} />
                    <FontAwesomeIcon icon={faCaretUp} />
                </span>);
                else if (order === 'asc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretUp} color="#334634" />
                </span>);
                else if (order === 'desc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} color="#334634" />
                </span>);
                return null;
            }
        },
        {
            dataField: 'saintek_score',
            text: 'Skor Saintek',
            align: 'center',
            sort: true,
            sortCaret: (order, column) => {
                if (!order) return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} />
                    <FontAwesomeIcon icon={faCaretUp} />
                </span>);
                else if (order === 'asc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretUp} color="#334634" />
                </span>);
                else if (order === 'desc') return (<span>&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} color="#334634" />
                </span>);
                return null;
            }
        }
    ];
    // const MySearch = (props) => {
    //     let input;
    //     const handleClick = () => {
    //       props.onSearch(input.value);
    //     };
    //     return (
    //       <div>
    //         <div className="input-group">
    //             <Input className="form-control border-right-0 border" 
    //                 type="search" ref={ n => input = n }  
    //                 id="search-table" placeholder="Cari disini..."
    //             />
    //             <span className="input-group-append">
    //                 <Button className="btn btn-outline-secondary border-left-0 border" 
    //                     type="button"
    //                     onClick={ handleClick }>
    //                     <FontAwesomeIcon icon={faSearch} />
    //                 </Button>
    //                 </span>
    //         </div>
    //       </div>
          
    //     );
    // };
    // const
    return (
      <React.Fragment>
        <Container className="mt-5 pt-5" id="container">
            <Row>
                <Col sm="12" md="8" className="mb-4">             
                    <h1 className="text-center 
                        font-weight-normal">
                        Riwayat Tryout
                    </h1>
                    <p className="text-center">
                        Hasil test kamu tersimpan dan dapat 
                        dilihat disini 
                    </p>
                    <Card body>
                    <ToolkitProvider
                        keyField="id"
                        data={ products }
                        columns={ columns }
                        search 
                        
                        >
                        {
                            props => (
                            <div>
                                <SearchBar { ...props.searchProps }
                                    type="search"
                                    className="float-right col-4 mt-2 mb-3"
                                    placeholder="Cari Disini..."
                                />
                                <BootstrapTable
                                    { ...props.baseProps }
                                    bootstrap4
                                    pagination={ paginationFactory() }
                                />
                                <br />
                            </div>
                            )
                        }
                    </ToolkitProvider>
                    </Card>
                </Col>
                <Col sm="12" md="4">
                    <Panel />
                </Col>
            </Row>
        </Container> 
      </React.Fragment>
    )
  }
}

export default Riwayat
