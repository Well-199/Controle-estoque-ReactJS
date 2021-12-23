import React, {useEffect, useState} from "react";
import logoArena from './Images/Arena_Logo.png';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const App = (props) => {

	const [produtos, setProdutos] = useState([]);
	const [codigo, setCodigo] = useState();
	const [descricao, setDescricao] = useState("");
	const [quantidade, setQuantidade] = useState();
	const [unidade, setUnidade] = useState();
	const [localizacao, setLocalizacao] = useState("");
	const [resultlista, setResultlista] = useState([]);
	const [local, setLocal] = useState("");

	var novoLocal;

	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const [modal2, setModal2] = useState(false);

	const [modal3, setModal3] = useState(false);
	const msgBox = () => setModal3(!modal3);

	var codigoLista; //codigo do produto usado na api para ver historico de localização
	
	const className  = props;

  	useEffect(() => {

		fetch("http://localhost:8081/API/PROJETO_ESTOQUE")
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setProdutos(data);
			})
		
	}, []);

	const handleChange = (e) => {

		setTimeout(() => {
			setLocal(e.target.value)
		}, 2000);
		
	};

	const adicionarLocalizacao = () => {

		fetch("http://localhost:8081/API/TAB_HIST_LOCALIZACAO?CODIGO="+codigo+"&LOCALIZACAO="+local)

			.then((response) => {
				return response.json();
			})
			.then((post) => {
				console.log(post);
				console.log("http://localhost:8081/API/TAB_HIST_LOCALIZACAO?CODIGO="+codigo+"&LOCALIZACAO="+local);
			});

			toggle();
			msgBox();
	};
		
	const aletarMecauto = () => {

		fetch("http://localhost:8081/API/PROJETO_ESTOQUE?CODIGO="+codigo+"&LOCALIZACAO="+local+"&DATA=1")

		.then((alt) => {
			//return alt.json();
		})
		.then((dadosAlterados) => {
			console.log(dadosAlterados);
		})
		
		setModal3(false);
		console.log("http://localhost:8081/API/PROJETO_ESTOQUE?CODIGO="+codigo+"&LOCALIZACAO="+local+"&DATA=1");

	};

	const lista = () =>   {

		fetch("http://localhost:8081/API/TAB_HIST_LOCALIZACAO?CODIGO="+codigoLista)

			.then((resSelect) => {
				return resSelect.json();
			})
			.then((select) => {
				console.log(select);
				setResultlista(select);
			})
					
			setModal2(!modal2);	
	};

	const fecharModal = () => {

		setModal(false);
		setModal2(false);
		setModal3(false);
		setCodigo();
		setLocal("");
		novoLocal = "";
	};

	return(
    <div className="body">

		<div className="logoArena">
			<img src={logoArena} alt="Logo Arena"/>
		</div>

		<div className="modalAdd">
      		<Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        		toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Incluir Localização</ModalHeader>
					<ModalBody>
						<div className="modalBody">
							<h3>SKU / CÓDIGO MECUATO: {codigo}</h3>
							<h3>Produto: {descricao}</h3>
							<h3>Localização Atual: {localizacao}</h3>
							<br></br>
							<h3>Nova Localização:</h3>
							<input type="text" className="addLocal" value={novoLocal} onChange={handleChange} />
						</div>
					</ModalBody>
					<ModalFooter>
						<Button className="buttonModal" color="primary" onClick={adicionarLocalizacao}>OK</Button>{' '}
						<Button className="buttonModal" color="danger" onClick={fecharModal}>Cancelar</Button>
				</ModalFooter>
		</Modal>
    </div>

	<div className="modalLista">
      	<Modal isOpen={modal2} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        	toggle={lista} className={className}>
				<ModalHeader toggle={lista}>Histórico de Localização</ModalHeader>
					<ModalBody>
						<div className="modalBody">

								<table className="tabelaLocal" border="1">
									<tr>
										<td><strong>DATA</strong></td>
										<td><strong>LOCALIZAÇÃO</strong></td>	
									</tr>
								</table>

							{resultlista.map((result) => 

								<table className="tabelaLocal" border="1">
									<tr>
										<td>{result.DATA}</td>
										<td>{result.LOCALIZACAO}</td>	
									</tr>
								</table>
							)}

						</div>
					</ModalBody>
					<ModalFooter>
						<Button className="buttonModal" color="danger" onClick={fecharModal}>FECHAR</Button>
				</ModalFooter>
		</Modal>
    </div>

	<div className="modalLista">
      	<Modal isOpen={modal3} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
        	toggle={msgBox} className={className}>
				<ModalHeader toggle={msgBox}>MENSSAGEM BOX</ModalHeader>
					<ModalBody>
						<div className="modalBody">

							<h2>DESEJA ATUALIZAR O SISTEMA MECAUTO COM ESSA NOVA LOCALIZAÇÃO ?</h2>
							

						</div>
					</ModalBody>
					<ModalFooter>
						<Button className="buttonModal" color="primary" onClick={aletarMecauto}>SIM</Button>{' '}
						<Button className="buttonModal" color="danger" onClick={msgBox}>NÃO</Button>
				</ModalFooter>
		</Modal>
    </div>

	<table className="tabela">
		<tr>
			<td>CM_COD_EST</td>
			<td>CM_DES_PROD</td>
			<td>CM_QTD_EST</td>
			<td>CM_UNI_DAD</td>
			<td>CM_LOC_EST</td>
			<td>HISTÓRICO</td>
			<td>INCLUIR LOCAL</td>
		</tr>
	</table>

	<div className="bodyTable">

			{produtos.map((produto) =>
				<table className="tabela2" border="1">
					<tr className="line" >
						<td>{produto.CM_COD_EST}</td>
						<td>{produto.CM_DES_PROD}</td>
						<td>{produto.CM_QTD_EST}</td>
						<td>{produto.CM_UNI_DAD}</td>
						<td>{produto.CM_LOC_EST}</td>
						<td><button type="button" onClick={() => {

							codigoLista = produto.CM_COD_EST;
							lista();

						}}>Histórico de Localização</button></td>

						<td><button className="incluir" type="button" onClick={() => {
							
							setCodigo(produto.CM_COD_EST);
							setDescricao(produto.CM_DES_PROD);
							setQuantidade(produto.CM_QTD_EST);
							setUnidade(produto.CM_UNI_DAD);
							setLocalizacao(produto.CM_LOC_EST);
							setLocal("");
							toggle();
							novoLocal = "";

							console.log(produto.CM_COD_EST)
							console.log(produto.CM_DES_PROD)
							console.log(produto.CM_QTD_EST)
							console.log(produto.CM_UNI_DAD)
							console.log(produto.CM_LOC_EST)
					
					}}>Incluir Localização</button></td>
					</tr>
				</table>
			)}
    	</div>
    </div>
  );
};


export default App;

