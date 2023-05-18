const imageUpdateProduct = "data:image/png;base64,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"

export default imageUpdateProduct