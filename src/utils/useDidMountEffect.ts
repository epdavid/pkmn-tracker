import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

//Cool custom hook to only run whenever dependencies change, but *not* on initial mount
const useDidMountEffect = (func: EffectCallback, deps: DependencyList) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useDidMountEffect;