var abi = [
	{
		constant: true,
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address'
			}
		],
		name: 'allInfoFor',
		outputs: [
			{
				internalType: 'uint256',
				name: 'totalTokenSupply',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'totalTokensFrozen',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userBalance',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userFrozen',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userDividends',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address'
			}
		],
		name: 'balanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [],
		name: 'collect',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				internalType: 'uint256',
				name: '_tokens',
				type: 'uint256'
			}
		],
		name: 'freeze',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				internalType: 'address',
				name: '_to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokens',
				type: 'uint256'
			}
		],
		name: 'transfer',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				internalType: 'address',
				name: '_to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokens',
				type: 'uint256'
			},
			{
				internalType: 'bytes',
				name: '_data',
				type: 'bytes'
			}
		],
		name: 'transferAndCall',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				internalType: 'uint256',
				name: '_tokens',
				type: 'uint256'
			}
		],
		name: 'unfreeze',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	}
];
var address = '0x14409b0fc5c7f87b5dad20754fe22d29a3de8217';
var FNB = web3.eth.contract(abi).at(address);

var requestAbi = [
	{
		constant: false,
		inputs: [],
		name: 'request',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	}
];
var requestAddress = '0xd0fc57b7ace231dc8a2a88004bc5a5df1eb0cc24';
var Request = web3.eth.contract(requestAbi).at(requestAddress);

var tumblerAbi = [
	{
		constant: false,
		inputs: [
			{
				internalType: 'uint256',
				name: '_runs',
				type: 'uint256'
			}
		],
		name: 'tumble',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	}
];
var tumblerAddress = '0xE2d4840A9883eb43F241Fc16b2e86296651E6b97';
var Tumbler = web3.eth.contract(tumblerAbi).at(tumblerAddress);

var faucetAddress = '0x0000965BB8A89ed0c9946ba2B976e6dc5eaEB017';

function init() {
	if (window.ethereum !== undefined) {
		window.ethereum.enable();
	}

	$('#freezeToggle .nav-link').click(function() {
		$('#freezeToggle .nav-link').removeClass('active');
		$(this).addClass('active');
		var toggle = $(this).attr('toggle');
		$('.freeze, .unfreeze').hide();
		$('.' + toggle).show();
	});

	$('#transfer').click(function() {
		var amount = parseFloat($('#transferAmount').val());
		var to = $('#transferReceiver').val();
		if (amount > 0 && to.length == 42) {
			FNB.transfer(to, web3.toWei(amount, 'ether'), function(error, hash) {
				if (!error) {
					console.log(hash);
				} else {
					console.log(error);
				}
			});
		}
	});

	$('#freeze').click(function() {
		var amount = parseFloat($('#freezeAmount').val());
		if (amount > 0) {
			FNB.freeze(web3.toWei(amount, 'ether'), function(error, hash) {
				if (!error) {
					console.log(hash);
				} else {
					console.log(error);
				}
			});
		}
	});

	$('#unfreeze').click(function() {
		var amount = parseFloat($('#unfreezeAmount').val());
		if (amount > 0) {
			FNB.unfreeze(web3.toWei(amount, 'ether'), function(error, hash) {
				if (!error) {
					console.log(hash);
				} else {
					console.log(error);
				}
			});
		}
	});

	$('#withdraw').click(function() {
		FNB.collect(function(error, hash) {
			if (!error) {
				console.log(hash);
			} else {
				console.log(error);
			}
		});
	});

	$('#request').click(function() {
		Request.request(function(error, hash) {
			if (!error) {
				console.log(hash);
			} else {
				console.log(error);
			}
		});
	});

	$('#tumble').click(function() {
		Tumbler.tumble(10, function(error, hash) {
			if (!error) {
				console.log(hash);
			} else {
				console.log(error);
			}
		});
	});

	var filter = web3.eth.filter('latest');
	filter.watch(function(error, result) {
		update();
	});

	setTimeout(update, 500);
}

function update() {
    var account =
        web3.eth.accounts !== undefined && web3.eth.accounts[0] !== undefined
            ? web3.eth.accounts[0]
            : '0x0000000000000000000000000000000000000001';
    FNB.allInfoFor.call(account, function(error, info) {
        if (!error) {
            console.log(info);
            $('#totalSupply').text(
                formatNumber(parseFloat(web3.fromWei(info[0], 'ether')), 5)
            );
            $('#totalFrozen').text(
                formatNumber(parseFloat(web3.fromWei(info[1], 'ether')), 5)
            );
            $('#myTokens').text(
                formatNumber(parseFloat(web3.fromWei(info[2], 'ether')), 5)
            );
            $('#myFrozen').text(
                formatNumber(parseFloat(web3.fromWei(info[3], 'ether')), 5)
            );
            $('#myDividends').text(
                formatNumber(parseFloat(web3.fromWei(info[4], 'ether')), 5)
            );
            $('#withdrawAmount').text(
                formatNumber(parseFloat(web3.fromWei(info[4], 'ether')), 5)
            );
            FNB.balanceOf.call(faucetAddress, function(error, balance) {
                if (!error) {
                    $('#faucetBalance').text(
                        formatNumber(parseFloat(web3.fromWei(balance, 'ether')), 5)
                    );
                    web3.eth.getBalance(account, 8900000, function(error, balance) {
                        if (!error) {
                            $('#myPastBalance').text(
                                formatNumber(parseFloat(web3.fromWei(balance, 'ether')), 5)
                            );
                        } else {
                            console.log(error);
                        }
                    });
                } else {
                    console.log(error);
                }
            });
        } else {
            console.log(error);
        }
    });
}

function log10(val) {
	return Math.log(val) / Math.log(10);
}

function formatNumber(n, maxDecimals) {
	var zeroes = Math.floor(log10(Math.abs(n)));
	var postfix = '';
	if (zeroes >= 9) {
		postfix = 'B';
		n /= 1e9;
		zeroes -= 9;
	} else if (zeroes >= 6) {
		postfix = 'M';
		n /= 1e6;
		zeroes -= 6;
	}

	zeroes = Math.min(maxDecimals, maxDecimals - zeroes);

	return (
		n.toLocaleString(undefined, {
			minimumFractionDigits: 0,
			maximumFractionDigits: Math.max(zeroes, 0)
		}) + postfix
	);
}

$(document).ready(init);
