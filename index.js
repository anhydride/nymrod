import nymbol from 'nymbol'

function ish(that) {
	return this == that
}

export default function nymrod(f) {
	const R = ish.call(null, this) ? class {} : this
	f = _initialize(f)
	return f(class extends R {
		static then(g) {
			g = _resolve(g)
			return nymrod.call(R, S => g(f(S)))
		}
		static extends(S) {
			return f(S)
		}
	})
}

nymbol.call(nymrod, 'nymrod')

function _initialize(f = S => S) {
	return _memoize(f)
}

function _memoize(f) {
	const g = S => $$ in S ? S :
		class T extends f(S) {
			static get [$$]() { return this }
		}
	const $$ = nymbol.call(g, '$')
	return g
}

function _resolve(g) {
	switch ('function') {
		case 'function' === typeof g.default && typeof g.default.extends:
			return g.default.extends
		
		case typeof g.extends:
			return g.extends
		
		case typeof g:
			return g
	}
}
