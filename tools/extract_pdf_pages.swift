import AppKit
import Foundation
import PDFKit

let arguments = CommandLine.arguments
guard arguments.count >= 3 else {
    fputs("Usage: swift extract_pdf_pages.swift <pdf-path> <output-dir>\n", stderr)
    exit(1)
}

let pdfURL = URL(fileURLWithPath: arguments[1])
let outputURL = URL(fileURLWithPath: arguments[2], isDirectory: true)

guard let document = PDFDocument(url: pdfURL) else {
    fputs("Failed to open PDF.\n", stderr)
    exit(1)
}

try FileManager.default.createDirectory(
    at: outputURL,
    withIntermediateDirectories: true
)

for index in 0..<document.pageCount {
    guard let page = document.page(at: index) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let scale: CGFloat = 2.0
    let width = Int(bounds.width * scale)
    let height = Int(bounds.height * scale)

    guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB) else { continue }
    guard let context = CGContext(
        data: nil,
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: 0,
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else {
        continue
    }

    context.setFillColor(NSColor.white.cgColor)
    context.fill(CGRect(x: 0, y: 0, width: CGFloat(width), height: CGFloat(height)))
    context.saveGState()
    context.translateBy(x: 0, y: CGFloat(height))
    context.scaleBy(x: scale, y: -scale)
    page.draw(with: .mediaBox, to: context)
    context.restoreGState()

    guard let cgImage = context.makeImage() else { continue }
    let image = NSImage(cgImage: cgImage, size: NSSize(width: width, height: height))
    guard
        let tiff = image.tiffRepresentation,
        let rep = NSBitmapImageRep(data: tiff),
        let png = rep.representation(using: .png, properties: [:])
    else {
        continue
    }

    let outputFile = outputURL.appendingPathComponent("page-\(index + 1).png")
    try png.write(to: outputFile)
    print(outputFile.path)
}
