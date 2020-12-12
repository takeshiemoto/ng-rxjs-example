package hello

const spanish = "Spanish"
const french = "French"

const englishHelloPrefix = "Hello, "
const spanishHelloPrefix = "Hola , "
const frenchPrefix = "Bonjour ,"

func Hello(name string, language string) string {
	if name == "" {
		name = "world"
	}
	return generatingPrefix(language) + name
}

func generatingPrefix(language string) (prefix string) {
	switch language {
	case spanish:
		prefix = spanishHelloPrefix
	case french:
		prefix = frenchPrefix
	default:
		prefix = englishHelloPrefix
	}
	return
}
