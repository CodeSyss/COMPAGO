import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Send, 
  ArrowDownLeft, 
  History, 
  User, 
  Bell, 
  QrCode, 
  Smartphone, 
  Scan, 
  UserPlus, 
  Banknote, 
  CreditCard, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

// Helper function to format currency correctly
const formatVesCurrency = (amount: number) => {
  const numberFormatter = new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `Bs. ${numberFormatter.format(amount)}`;
};

// Componente de Modal genérico
const Modal = ({ show, onClose, children, title, onConfirm, confirmText = "Confirmar" }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-foreground/75 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-xl shadow-elevated p-6 w-full max-w-sm border">
        <h3 className="text-xl font-bold text-card-foreground mb-4">{title}</h3>
        <div className="text-card-foreground/80 mb-6">{children}</div>
        <div className="flex justify-end space-x-3">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors duration-200 shadow-primary font-semibold"
            >
              {confirmText}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors duration-200 font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Notificación
const Notification = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-destructive' : 'bg-secondary';
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : Bell;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose, message]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-elevated ${bgColor} text-white z-50 animate-in slide-in-from-top-2 duration-300`}>
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5" />
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 hover:bg-white/20 rounded-full p-1">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Datos mock para simulación
const mockBalances = [
  { bank: 'Banesco', balance: 525.75, currency: 'VES', icon: '🏦', color: 'from-blue-500 to-blue-600' },
  { bank: 'Mercantil', balance: 890.20, currency: 'VES', icon: '💰', color: 'from-green-500 to-green-600' },
  { bank: 'Provincial', balance: 100.50, currency: 'VES', icon: '💳', color: 'from-purple-500 to-purple-600' },
];

const mockTransactions = [
  { id: 't001', type: 'Envío', amount: 50.00, receiver: 'María G.', method: 'NFC', date: '2025-01-04' },
  { id: 't002', type: 'Recepción', amount: 120.00, sender: 'Tienda Express', method: 'QR', date: '2025-01-03' },
  { id: 't003', type: 'Envío', amount: 35.50, receiver: 'Pedro R.', method: 'Manual', date: '2025-01-02' },
  { id: 't004', type: 'Recepción', amount: 200.00, sender: 'Cliente X', method: 'NFC', date: '2025-01-01' },
  { id: 't005', type: 'Envío', amount: 75.00, receiver: 'Farmacia Salud', method: 'Contacto', date: '2024-12-31' },
];

const mockContacts = [
  { name: 'Juan Pérez', phone: '04121234567', id: 'V-12345678', bank: 'Banesco' },
  { name: 'Ana López', phone: '04147654321', id: 'V-87654321', bank: 'Mercantil' },
  { name: 'Carlos Ruiz', phone: '04269876543', id: 'V-98765432', bank: 'Provincial' },
];

// Componente de Login
const LoginScreen = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleLogin = () => {
    if (pin === '1234') {
      onLogin();
    } else {
      setError('PIN incorrecto. Intente de nuevo.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-primary p-4">
      <div className="bg-card p-8 rounded-xl shadow-elevated w-full max-w-md text-center border">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-2">
            COMPAGO
          </h1>
          <p className="text-muted-foreground">La evolución de tu Pago Móvil</p>
        </div>
        
        <div className="mb-6 relative">
          <input
            type={showPin ? "text" : "password"}
            placeholder="Ingrese su PIN (1234)"
            className="w-full p-4 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-center text-lg tracking-widest pr-12 bg-background"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(''); }}
            onKeyDown={handleKeyPress}
            maxLength={4}
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
          >
            {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          {error && (
            <p className="text-destructive text-sm mt-2 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </p>
          )}
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all duration-200 shadow-primary mb-4"
        >
          Ingresar
        </button>
        
        <div className="space-y-2 text-sm">
          <button className="text-muted-foreground hover:text-primary">
            ¿Olvidaste tu PIN?
          </button>
          <br />
          <button className="text-primary font-semibold hover:underline">
            Crear Cuenta Nueva
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Dashboard
const Dashboard = ({ onNavigate, balances, transactions }) => {
  const [showBalance, setShowBalance] = useState(false);
  const totalBalance = balances.reduce((sum, bank) => sum + bank.balance, 0);

  return (
    <div className="p-4 sm:p-6 pb-20">
      {/* Hero Card */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-xl shadow-primary mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Hola Carlos</h2>
            <div className="flex space-x-3">
              <button onClick={() => onNavigate('profile')} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <User className="w-5 h-5" />
              </button>
              {/* <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Bell className="w-5 h-5" />
              </button> */}
            </div>
          </div>
          
          <p className="text-lg text-primary-foreground/80 mb-2">Tu saldo total</p>
          <div className="flex items-center">
            <p className="text-4xl font-extrabold mr-3">
              {showBalance ? formatVesCurrency(totalBalance) : '•••••'}
            </p>
            <button 
              onClick={() => setShowBalance(!showBalance)} 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {showBalance ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => onNavigate('sendPayment')}
          className="bg-card p-4 rounded-xl shadow-card border hover:shadow-elevated transition-all duration-200 group"
        >
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-full mb-2 group-hover:bg-primary/20 transition-colors">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <span className="font-semibold text-card-foreground">Enviar</span>
          </div>
        </button>
        
        <button
          onClick={() => onNavigate('receivePayment')}
          className="bg-card p-4 rounded-xl shadow-card border hover:shadow-elevated transition-all duration-200 group"
        >
          <div className="flex flex-col items-center">
            <div className="bg-success/10 p-3 rounded-full mb-2 group-hover:bg-success/20 transition-colors">
              <ArrowDownLeft className="w-6 h-6 text-success" />
            </div>
            <span className="font-semibold text-card-foreground">Recibir</span>
          </div>
        </button>
      </div>

      {/* Saldos por Banco */}
      <div className="bg-card p-6 rounded-xl shadow-card border mb-8">
        <h3 className="text-xl font-semibold text-card-foreground mb-4">Saldos por Banco</h3>
        <div className="space-y-4">
          {balances.map((bank, index) => (
            <div key={index} className="bg-gradient-card p-4 rounded-lg border border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{bank.icon}</span>
                  <div>
                    <p className="font-medium text-card-foreground">{bank.bank}</p>
                    <p className="text-sm text-muted-foreground">Cuenta corriente</p>
                  </div>
                </div>
                <p className="text-xl font-normal text-foreground">
                  {formatVesCurrency(bank.balance)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Últimas Transacciones */}
      <div className="bg-card p-6 rounded-xl shadow-card border">
        <h3 className="text-xl font-semibold text-card-foreground mb-4">Últimos Movimientos</h3>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <Banknote className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Aún no tienes movimientos</p>
            <button
              onClick={() => onNavigate('sendPayment')}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-primary"
            >
              Realizar un Pago
            </button>
          </div>
        ) : (
          <ul className="space-y-3">
            {transactions.slice(0, 5).map((tx) => (
              <li key={tx.id} className="flex justify-between items-center p-3 bg-accent/20 rounded-lg border border-border/30">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${tx.type === 'Envío' ? 'bg-destructive/10' : 'bg-success/10'}`}>
                    {tx.type === 'Envío' ? 
                      <Send className={`w-4 h-4 ${tx.type === 'Envío' ? 'text-destructive' : 'text-success'}`} /> :
                      <ArrowDownLeft className="w-4 h-4 text-success" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">
                      {tx.type === 'Envío' ? `Envío a ${tx.receiver}` : `Recepción de ${tx.sender}`}
                    </p>
                    <p className="text-sm text-muted-foreground">{tx.date} • {tx.method}</p>
                  </div>
                </div>
                <p className="font-normal text-foreground">
                  {tx.type === 'Envío' ? '-' : '+'}{formatVesCurrency(tx.amount)}
                </p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => onNavigate('history')}
          className="mt-6 w-full py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors duration-200 font-semibold"
        >
          Ver todo el historial
        </button>
      </div>
    </div>
  );
};

// Componente de Envío de Pago
const SendPaymentScreen = ({ onNavigate, onSendPayment }) => {
  const [activeTab, setActiveTab] = useState('nfc');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [receiverBank, setReceiverBank] = useState('');
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const resetForm = () => {
    setReceiverPhone('');
    setReceiverId('');
    setReceiverBank('');
    setAmount('');
    setConcept('');
    setSelectedContact('');
    setPaymentDetails(null);
  };

  const handleSimulateAutoFill = (mockData) => {
    setReceiverPhone(mockData.phone);
    setReceiverId(mockData.id);
    setReceiverBank(mockData.bank);
    setAmount(mockData.amount?.toString() || '');
    setConcept(mockData.concept || '');
    setPaymentDetails(mockData);
  };

  const handleContactSelect = (e) => {
    const contactName = e.target.value;
    const contact = mockContacts.find(c => c.name === contactName);
    if (contact) {
      setSelectedContact(contactName);
      setReceiverPhone(contact.phone);
      setReceiverId(contact.id);
      setReceiverBank(contact.bank);
      setAmount('');
      setConcept('');
      setPaymentDetails(null);
    } else {
      resetForm();
    }
  };

  const handleConfirmPayment = () => {
    if (!receiverPhone || !receiverBank || !amount) {
      alert('Por favor, complete todos los campos requeridos (Teléfono, Banco, Monto).');
      return;
    }
    setPaymentDetails({
      phone: receiverPhone,
      id: receiverId,
      bank: receiverBank,
      amount: parseFloat(amount),
      concept: concept,
      method: activeTab === 'nfc' ? 'NFC' : activeTab === 'qr' ? 'QR' : activeTab === 'manual' ? 'Manual' : 'Contacto'
    });
    setShowConfirmModal(true);
  };

  const processPayment = () => {
    setShowConfirmModal(false);
    if (paymentDetails) {
      onSendPayment(paymentDetails);
      resetForm();
      onNavigate('dashboard');
    }
  };

  const tabs = [
    { id: 'nfc', label: 'NFC', icon: Smartphone },
    { id: 'qr', label: 'QR', icon: QrCode },
    { id: 'manual', label: 'Manual', icon: CreditCard },
    { id: 'contact', label: 'Contactos', icon: UserPlus }
  ];

  return (
    <div className="p-4 sm:p-6 pb-20">
      <div className="flex items-center mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="mr-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowDownLeft className="w-5 h-5 rotate-90" />
        </button>
        <h2 className="text-3xl font-bold text-foreground">Enviar Pago Móvil</h2>
      </div>

      <div className="bg-card p-6 rounded-xl shadow-card border mb-8">
        {/* Tabs */}
        <div className="flex border-b border-border mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`py-3 px-4 text-sm sm:text-base font-medium flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => { setActiveTab(tab.id); resetForm(); }}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'nfc' && (
          <div className="text-center py-8">
            <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Smartphone className="w-12 h-12 text-primary" />
            </div>
            <p className="text-muted-foreground mb-6">Acerca tu dispositivo al cobrador para auto-llenar los datos</p>
            <button
              onClick={() => handleSimulateAutoFill({ 
                phone: '04129876543', 
                id: 'V-19876543', 
                bank: 'Banesco', 
                amount: 85.00, 
                concept: 'Almuerzo' 
              })}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 shadow-primary"
            >
              Simular Acercamiento NFC
            </button>
          </div>
        )}

        {activeTab === 'qr' && (
          <div className="text-center py-8">
            <div className="bg-success/10 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Scan className="w-12 h-12 text-success" />
            </div>
            <p className="text-muted-foreground mb-6">Escanea el código QR del cobrador para auto-llenar los datos</p>
            <button
              onClick={() => handleSimulateAutoFill({ 
                phone: '04141122334', 
                id: 'J-20123456', 
                bank: 'Mercantil', 
                amount: 150.00, 
                concept: 'Compra en tienda' 
              })}
              className="w-full bg-success text-success-foreground py-3 rounded-lg font-semibold hover:bg-success/90 transition-colors duration-200"
            >
              Simular Escaneo QR
            </button>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="py-4">
            <label htmlFor="contact-select" className="block text-foreground text-sm font-semibold mb-2">
              Seleccionar Contacto:
            </label>
            <select
              id="contact-select"
              className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background"
              value={selectedContact}
              onChange={handleContactSelect}
            >
              <option value="">Seleccione un contacto</option>
              {mockContacts.map((contact, index) => (
                <option key={index} value={contact.name}>{contact.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="phone" className="block text-foreground text-sm font-semibold mb-2">
              Teléfono del Cobrador:
            </label>
            <input
              type="text"
              id="phone"
              className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background"
              value={receiverPhone}
              onChange={(e) => setReceiverPhone(e.target.value)}
              placeholder="Ej: 04121234567"
              readOnly={activeTab === 'nfc' || activeTab === 'qr'}
            />
          </div>
          
          <div>
            <label htmlFor="id" className="block text-foreground text-sm font-semibold mb-2">
              Cédula/RIF del Cobrador (Opcional):
            </label>
            <input
              type="text"
              id="id"
              className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              placeholder="Ej: V-12345678"
              readOnly={activeTab === 'nfc' || activeTab === 'qr'}
            />
          </div>
          
          <div>
            <label htmlFor="bank" className="block text-foreground text-sm font-semibold mb-2">
              Banco del Cobrador:
            </label>
            <select
              id="bank"
              className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background"
              value={receiverBank}
              onChange={(e) => setReceiverBank(e.target.value)}
              disabled={activeTab === 'nfc' || activeTab === 'qr'}
            >
              <option value="">Seleccione un banco</option>
              {mockBalances.map((bank, index) => (
                <option key={index} value={bank.bank}>{bank.bank}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-foreground text-sm font-semibold mb-2">
              Monto (VES):
            </label>
            <input
              type="number"
              id="amount"
              className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ej: 50000.00"
              step="0.01"
              readOnly={activeTab === 'nfc' || activeTab === 'qr'}
            />
          </div>
          
          <div>
            <label htmlFor="concept" className="block text-foreground text-sm font-semibold mb-2">
              Concepto (Opcional):
            </label>
            <input
              type="text"
              id="concept"
              className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Ej: Pago de almuerzo"
              readOnly={activeTab === 'nfc' || activeTab === 'qr'}
            />
          </div>
        </div>

        <button
          onClick={handleConfirmPayment}
          className="mt-8 w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors duration-200 shadow-primary"
        >
          Confirmar Pago
        </button>
      </div>

      <Modal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={processPayment}
        title="Confirmar Transacción"
        confirmText="Autorizar Pago"
      >
        {paymentDetails && (
          <div className="space-y-3">
            <div className="bg-accent/20 p-4 rounded-lg space-y-2">
              <p><span className="font-semibold">Teléfono:</span> {paymentDetails.phone}</p>
              <p><span className="font-semibold">Identificación:</span> {paymentDetails.id || 'N/A'}</p>
              <p><span className="font-semibold">Banco:</span> {paymentDetails.bank}</p>
              <p><span className="font-semibold">Monto:</span> <span className="font-normal text-foreground">{formatVesCurrency(paymentDetails.amount)}</span></p>
              <p><span className="font-semibold">Concepto:</span> {paymentDetails.concept || 'N/A'}</p>
            </div>
            <p className="text-sm text-muted-foreground flex items-center">
              <Lock className="w-4 h-4 mr-1" />
              Confirme con su PIN o biometría
            </p>
            <input 
              type="password" 
              placeholder="Ingrese PIN (1234)" 
              className="w-full p-3 border border-input rounded-lg bg-background text-center tracking-widest" 
              maxLength={4} 
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

// Componente de Recepción de Pago (SoftPOS)
const ReceivePaymentScreen = ({ onNavigate, onReceivePayment }) => {
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');
  const [cobroActive, setCobroActive] = useState(false);
  const [qrData, setQrData] = useState('');

  const handleActivateCobro = () => {
    if (!amount) {
      alert('Por favor, ingrese el monto a cobrar.');
      return;
    }
    const cobroDetails = {
      amount: parseFloat(amount),
      concept: concept,
      receiverPhone: '04167890123',
      receiverId: 'V-10000000',
      receiverBank: 'COMPAGO Bank'
    };
    setQrData(JSON.stringify(cobroDetails));
    setCobroActive(true);
  };

  const handleSimulateIncomingPayment = () => {
    const mockIncomingPayment = {
      id: `rec${Date.now()}`,
      type: 'Recepción',
      amount: parseFloat(amount),
      sender: 'Cliente Simulador',
      method: 'NFC',
      date: new Date().toISOString().slice(0, 10)
    };
    onReceivePayment(mockIncomingPayment);
    setCobroActive(false);
    setAmount('');
    setConcept('');
    onNavigate('dashboard');
  };

  return (
    <div className="p-4 sm:p-6 pb-20">
      <div className="flex items-center mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="mr-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowDownLeft className="w-5 h-5 rotate-90" />
        </button>
        <h2 className="text-3xl font-bold text-foreground">Recibir Pago (SoftPOS)</h2>
      </div>

      <div className="bg-card p-6 rounded-xl shadow-card border mb-8">
        {!cobroActive ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-success/10 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="w-12 h-12 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Modo Comerciante</h3>
              <p className="text-muted-foreground">Configure el monto y active el cobro</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="receiveAmount" className="block text-foreground text-sm font-semibold mb-2">
                  Monto a Cobrar (VES):
                </label>
                <input
                  type="number"
                  id="receiveAmount"
                  className="w-full p-4 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background text-lg font-semibold"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              
              <div>
                <label htmlFor="receiveConcept" className="block text-foreground text-sm font-semibold mb-2">
                  Concepto (Opcional):
                </label>
                <input
                  type="text"
                  id="receiveConcept"
                  className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-background"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="Ej: Venta de producto"
                />
              </div>
            </div>
            
            <button
              onClick={handleActivateCobro}
              className="w-full bg-success text-success-foreground py-4 rounded-lg font-semibold text-lg hover:bg-success/90 transition-colors duration-200"
            >
              Activar Modo Cobro
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-success/10 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <QrCode className="w-12 h-12 text-success animate-pulse" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Esperando Pago</h3>
              <p className="text-3xl font-normal text-foreground mb-2">
                {formatVesCurrency(parseFloat(amount))}
              </p>
              <p className="text-muted-foreground">por NFC o escaneo de QR</p>
            </div>

            {qrData && (
              <div className="bg-background p-6 rounded-lg inline-block border-2 border-dashed border-success">
                <QrCode className="w-32 h-32 text-success mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Código QR para pago</p>
              </div>
            )}
            
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Acerca el dispositivo del pagador o haz que escanee el QR
              </p>
              
              <button
                onClick={handleSimulateIncomingPayment}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 shadow-primary"
              >
                Simular Pago Entrante
              </button>
              
              <button
                onClick={() => setCobroActive(false)}
                className="w-full py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Historial de Transacciones
const TransactionHistoryScreen = ({ onNavigate, transactions }) => {
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type.toLowerCase() === filter;
  });

  return (
    <div className="p-4 sm:p-6 pb-20">
      <div className="flex items-center mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="mr-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowDownLeft className="w-5 h-5 rotate-90" />
        </button>
        <h2 className="text-3xl font-bold text-foreground">Historial</h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'envío', label: 'Enviados' },
          { id: 'recepción', label: 'Recibidos' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              filter === tab.id
                ? 'bg-card text-card-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-card p-6 rounded-xl shadow-card border">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No hay transacciones para mostrar</p>
            <button
              onClick={() => onNavigate('sendPayment')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-primary"
            >
              Realizar Primera Transacción
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-border/30 hover:bg-accent/20 transition-colors">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full mr-4 ${tx.type === 'Envío' ? 'bg-destructive/10' : 'bg-success/10'}`}>
                    {tx.type === 'Envío' ? 
                      <Send className="w-5 h-5 text-destructive" /> :
                      <ArrowDownLeft className="w-5 h-5 text-success" />
                    }
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">
                      {tx.type === 'Envío' ? `Envío a ${tx.receiver}` : `Recepción de ${tx.sender}`}
                    </p>
                    <p className="text-sm text-muted-foreground">{tx.date} • {tx.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-normal text-foreground">
                    {tx.type === 'Envío' ? '-' : '+'}{formatVesCurrency(tx.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tx.type === 'Envío' ? 'Enviado' : 'Recibido'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Perfil
const ProfileScreen = ({ onNavigate, onLogout }) => {
  const user = {
    name: 'Carlos Hernández',
    phone: '0412-3456789',
    id: 'V-12.345.678',
    avatar: 'CH'
  };

  return (
    <div className="p-4 sm:p-6 pb-20">
      <div className="flex items-center mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="mr-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowDownLeft className="w-5 h-5 rotate-90" />
        </button>
        <h2 className="text-3xl font-bold text-foreground">Mi Perfil</h2>
      </div>

      <div className="bg-card p-6 rounded-xl shadow-card border mb-8 text-center">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {user.avatar}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-card-foreground">{user.name}</h3>
        <p className="text-muted-foreground">{user.phone}</p>
        <p className="text-muted-foreground">{user.id}</p>
      </div>

      <div className="bg-card p-6 rounded-xl shadow-card border">
        <h3 className="text-xl font-semibold text-card-foreground mb-4">Opciones</h3>
        <div className="space-y-2">
           <button className="w-full text-left p-4 rounded-lg hover:bg-muted transition-colors flex justify-between items-center">
            <span>Editar Perfil</span>
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
           <button className="w-full text-left p-4 rounded-lg hover:bg-muted transition-colors flex justify-between items-center">
            <span>Seguridad</span>
            <Lock className="w-5 h-5 text-muted-foreground" />
          </button>
           <button className="w-full text-left p-4 rounded-lg hover:bg-muted transition-colors flex justify-between items-center">
            <span>Notificaciones</span>
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onLogout}
          className="w-full bg-destructive/10 text-destructive py-3 rounded-lg font-semibold hover:bg-destructive/20 transition-colors duration-200"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

// Componente principal de la aplicación
const COMPAGO = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [balances, setBalances] = useState(mockBalances);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [notification, setNotification] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard'); // o 'login'
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleSendPayment = (paymentDetails) => {
    setNotification({ message: 'Procesando pago...', type: 'info' });
    setTimeout(() => {
      const newTransaction = {
        id: `t${Date.now()}`,
        type: 'Envío',
        amount: paymentDetails.amount,
        receiver: paymentDetails.id ? `${paymentDetails.phone} (${paymentDetails.id})` : paymentDetails.phone,
        method: paymentDetails.method,
        date: new Date().toISOString().slice(0, 10)
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      setNotification({ message: '¡Pago enviado con éxito!', type: 'success' });
      setBalances((prevBalances) =>
        prevBalances.map((b) =>
          b.bank === 'Banesco' ? { ...b, balance: b.balance - paymentDetails.amount } : b
        )
      );
    }, 1500);
  };

  const handleReceivePayment = (paymentDetails) => {
    setNotification({ message: 'Confirmando recepción de pago...', type: 'info' });
    setTimeout(() => {
      setTransactions((prev) => [paymentDetails, ...prev]);
      setNotification({ message: '¡Pago recibido con éxito!', type: 'success' });
      setBalances((prevBalances) =>
        prevBalances.map((b) =>
          b.bank === 'Provincial' ? { ...b, balance: b.balance + paymentDetails.amount } : b
        )
      );
    }, 1500);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <div className="flex flex-col flex-grow">
          {/* Header */}
          <nav className="bg-gradient-primary shadow-lg p-4 flex justify-between items-center text-primary-foreground">
            <h1 className="text-2xl font-bold">COMPAGO</h1>
            <div className="flex space-x-3">
              <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout} 
                className="p-2 rounded-full hover:bg-white/20 transition-colors text-sm font-medium"
              >
                Salir
              </button>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-grow overflow-y-auto">
            {currentPage === 'dashboard' && (
              <Dashboard
                onNavigate={setCurrentPage}
                balances={balances}
                transactions={transactions}
              />
            )}
            {currentPage === 'sendPayment' && (
              <SendPaymentScreen
                onNavigate={setCurrentPage}
                onSendPayment={handleSendPayment}
              />
            )}
            {currentPage === 'receivePayment' && (
              <ReceivePaymentScreen
                onNavigate={setCurrentPage}
                onReceivePayment={handleReceivePayment}
              />
            )}
            {currentPage === 'profile' && (
              <ProfileScreen
                onNavigate={setCurrentPage}
                onLogout={handleLogout}
              />
            )}
            {currentPage === 'history' && (
              <TransactionHistoryScreen
                onNavigate={setCurrentPage}
                transactions={transactions}
              />
            )}
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-card shadow-elevated border-t border-border flex justify-around items-center p-2 rounded-t-xl">
            {[
              { id: 'dashboard', label: 'Inicio', icon: Home },
              { id: 'sendPayment', label: 'Enviar', icon: Send },
              { id: 'receivePayment', label: 'Recibir', icon: ArrowDownLeft },
              { id: 'history', label: 'Historial', icon: History },
              { id: 'profile', label: 'Perfil', icon: User }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`flex flex-col items-center text-xs font-medium p-3 rounded-lg transition-all duration-200 ${
                  currentPage === id 
                    ? 'text-primary bg-primary/10 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default COMPAGO;