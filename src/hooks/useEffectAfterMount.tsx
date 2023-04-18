import { useEffect, useRef } from "react"


export default (cb: () => any, deps: any[]) => {
	const mounted = useRef(false)

	useEffect(() => {
		console.log('mounted.current', mounted.current)
		if (mounted.current) {
			cb()
		} else {
			mounted.current = true
		}
	}, deps)
}