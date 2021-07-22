/**
 * Return an object, it use `props` as it's keys and use `values` as it's values.
 *
 * @param props Properties array
 * @param values Values array
 * @param object
 */
function zipObject<K extends number | string | symbol, V>(
  props: ReadonlyArray<K> | K[] = [],
  values: ReadonlyArray<V> | V[] = [],
  object: Record<K, V> = {} as any
): Record<K, V> {

  for (let i = 0; i < props.length; i++) {
    object[props[i]] = values[i]
  }
  return object
}

export default zipObject
