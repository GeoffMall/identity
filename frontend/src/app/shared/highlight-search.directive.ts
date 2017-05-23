import {Directive, ElementRef, Renderer, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appHighlightSearch]'
})
export class HighlightSearchDirective implements OnInit, OnChanges {
  @Input() search: string;
  @Input() text: string;
  @Input() classToApply: string;
  matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["search"] != undefined) {
      this.updateHighlights();
    }
  }

  ngOnInit() {
    if (typeof this.classToApply === 'undefined') {
      this.classToApply = '';
    }

    if (typeof this.search === 'undefined') {
      this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.text);
      return;
    }

    this.updateHighlights();
  }

  updateHighlights() {
    if(this.search != undefined) {
      let search = this.escapeStringRegexp(this.search.toString());
      this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.replace(this.text, search));
    }
  }

  replace(txt: string, search: string) {
    if(txt != undefined) {
      let searchRgx = new RegExp('(' + search + ')', 'ig');
      return txt.replace(searchRgx, `<span class="${this.classToApply}">$1</span>`);
    } else {
      return '';
    }
  }

  private escapeStringRegexp(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a string');
    }
    return str.replace(this.matchOperatorsRe, '\\$&');
  }
}

